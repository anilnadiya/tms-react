import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateProperty,
  DeleteProperty,
  UpdateProperty,
  propertyList,
} from "../../../../redux/Thunk/AdminModule/AdminThunk";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { SortAlphabetically } from "../../../../Helper/SortAlphbetically";
import GenericForm from "../../../../Components/Ui_elements/GenericForm";
import GenericTable from "../../../../Components/Ui_elements/GenericTable";
import PopupModal from "../../../../Components/Ui_elements/PopupModal";
import Btn from "../../../../Components/Ui_elements/Btn";


const Properties = () => {
  const dispatch = useDispatch();
  const { property } = useSelector((state) => state.root.AdminModule);
  const [openForDelete, setOpenForDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [dynamicFields, setDynamicFields] = useState([
    { value_name: "", description: "" }, // Initial row
  ]);
  const [formData, setFormData] = useState({
    property_id: null,
    description: "",
    property_name: "",
    is_active: false,
    resource: false,
    request: false,
    project: false,
    item: false,
  });
  const [errors, setErrors] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    dispatch(propertyList());
  }, [dispatch]);

   // Add more rows of fields
   const handleAddMoreFields = () => {
    setDynamicFields([...dynamicFields, { value_name: "", description: "" }]);
  };

  const handleDynamicFieldChange = (index, name, value) => {
    const updatedFields = [...dynamicFields];
    updatedFields[index][name] = value;
    setDynamicFields(updatedFields);
  };

  const fields = [
    {
      name: "property_name",
      label: "Property Name",
      type: "text",
      gridSize: 4,
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      gridSize: 4,
    },
    { name: "is_active", label: "Active (Set as active)", type: "checkbox", gridSize: 4 },
    { name: "resource", label: "Resources", type: "checkbox", gridSize: 3 },
    { name: "request", label: "Request", type: "checkbox", gridSize: 3 },
    { name: "project", label: "Project", type: "checkbox", gridSize: 3 },
    { name: "item", label: "Item", type: "checkbox", gridSize: 3 },
  ];

  const columns = [
    {
      name: "rowNumber",
      label: "No.",
      options: {
        sort: true, // Enable sorting for this column
      },
    },
    {
      name: "property_id",
      label: "ID",
      options: {
        display: false, // Hide the column
      },
    },
    { name: "property_name", label: "Property Name" },
    { name: "description", label: "Description" },
    {
      name: "is_active",
      label: "Status",
      options: {
        customBodyRender: (value) =>
          value === 1 ? (
            <span style={{ color: "green" }}>Active</span>
          ) : (
            <span style={{ color: "red" }}>InActive</span>
          ),
      },
    },
  ];
  const sortedData = SortAlphabetically(property || [], "property_name");

  const data = sortedData?.map((item, index) => ({
    rowNumber: index + 1, // Explicitly add sequential numbers
    property_id: item.property_id,
    property_name: item.property_name,
    description: item.description,
    is_active: item.is_active, // This matches the column key
    resource: item.resource,
    request: item.request,
    project: item.project,
    item: item.item,
  }));

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData?.property_name.trim()) {
      newErrors.property_name = "Property Name is required";
    }
    if (!formData?.description.trim()) {
      newErrors.description = "Description is required";
    }

    return newErrors;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      property_name: formData.property_name,
      description: formData.description,
      is_active: formData.is_active ? 1 : 0,
      resource: formData.resource ? 1 : 0,
      request: formData.request ? 1 : 0,
      project: formData.project ? 1 : 0,
      item: formData.item ? 1 : 0,
    };

    if (isEdit) {
      dispatch(
        UpdateProperty({ property_id: formData.property_id, ...payload })
      );
    } else {
      dispatch(CreateProperty(payload));
    }

    // Reset form and states
    setFormData({
      property_id: null,
      property_name: "",
      description: "",
      status: false,
    });
    setIsEdit(false);
    setErrors({});
  };

  const handleEdit = (rowData) => {
    const selectedData = property?.find(
      (item) => item.property_id === rowData[1]
    );
    if (selectedData) {
      setFormData({
        property_id: selectedData.property_id,
        property_name: selectedData.property_name,
        description: selectedData.description,
        is_active: selectedData.is_active,
        resource: selectedData.resource,
        request: selectedData.request,
        project: selectedData.project,
        item: selectedData.item,
      });
      setIsEdit(true);
    } else {
      console.error("Unable to find the selected data for editing.");
    }
  };

  // Handle delete
  const handleDelete = (id) => {
    setOpenForDelete(true);
    setDeleteId(id);
  };
  return (
    <>
      <Typography variant="h6" sx={{ py: 2 }}>
        Properties (<span style={{ color: "red", fontSize: "12px" }}>TODO: - Values api left to be implemented</span>)
      </Typography>
      <GenericForm
        fields={fields}
        values={formData}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        errors={errors}
        isEdit={isEdit}
      />
      <GenericTable
        columns={columns}
        data={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
        showDelete={true}
        displayColumns={4}
        displayRows={10}
      />
      {openForDelete && (
        <PopupModal
          maxWidth={"sm"}
          fullWidth={true}
          open={openForDelete}
          handleClose={() => setOpenForDelete(false)}
          actions={
            <Grid container columnGap={2} justifyContent={"end"}>
              <Btn
                onClick={() =>
                  dispatch(DeleteProperty(deleteId)).then(() =>
                    setOpenForDelete(false)
                  )
                }
              >
                Yes
              </Btn>
              <Btn
                onClick={() => setOpenForDelete(false)}
              >
                Cancel
              </Btn>
            </Grid>
          }
          title={<Typography variant="h6">Delete Property</Typography>}
        >
          <Typography>
            Are you sure you want to delete the property?
          </Typography>
        </PopupModal>
      )}
    </>
  );
};

export default Properties;
