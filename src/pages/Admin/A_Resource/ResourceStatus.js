import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateResourceStatus,
  DeleteResourceStatus,
  resourceStatusList,
  UpdateResourceStatus,
} from "../../../redux/Thunk/AdminModule/AdminThunk";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import GenericTable from "../../../Components/Ui_elements/GenericTable";
import GenericForm from "../../../Components/Ui_elements/GenericForm";
import PopupModal from "../../../Components/Ui_elements/PopupModal";
import { SortAlphabetically } from "../../../Helper/SortAlphbetically";
import Btn from "../../../Components/Ui_elements/Btn";

const ResourceStatus = () => {
  const dispatch = useDispatch();
  const { resource_status } = useSelector((state) => state.root.AdminModule);
  const [openForDelete, setOpenForDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    status_id: null,
    status_name: "",
    status_type: false,
  });
  const [errors, setErrors] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    dispatch(resourceStatusList());
  }, []);

  const fields = [
    {
      name: "status_name",
      label: "Name Of Resource Status",
      type: "text",
      gridSize: 4,
    },
    { name: "status_type", label: "Is Active", type: "checkbox" },
  ];

  const columns = [
    {
      name: "rowNumber",
      label: "No.",
      options: {
        sort: true, // Enable sorting for this column
      },
    },
    { name: "status_id", label: "ID", options: { display: false } },
    { name: "status_name", label: "Name of Resource Status" },
    {
      name: "status_type",
      label: "Status",
      options: {
        customBodyRender: (value) =>
          value === 1 ? (
            <span style={{ color: "green" }}>Active</span>
          ) : (
            <span style={{ color: "red" }}>Inactive</span>
          ),
      },
    },
  ];
  const sortedData = SortAlphabetically(resource_status || [], "status_name");

  const data = sortedData?.map((item, index) => ({
    rowNumber: index + 1,
    status_id: item.status_id,
    status_name: item.status_name,
    status_type: item.status_type, // This matches the column key
  }));

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};
    if (!formData?.status_name?.toString().trim()) {
      newErrors.status_name = "Status Name is required";
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
      status_name: formData.status_name,
      status_type: 1,
    };

    if (isEdit) {
      dispatch(
        UpdateResourceStatus({ status_id: formData.status_id, ...payload })
      );
    } else {
      dispatch(CreateResourceStatus(payload));
    }

    // Reset form and states
    setFormData({ status_id: null, status_name: "", status: false });
    setIsEdit(false);
    setErrors({});
  };

  const handleEdit = (rowData) => {
    const selectedData = resource_status.find(
      (item) => item.status_id === rowData[1]
    );

    if (selectedData) {
      setFormData({
        status_id: selectedData.status_id,
        status_name: selectedData.status_name,
        status_type: selectedData.status_type === 1,
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
        Resource Status
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
                  dispatch(DeleteResourceStatus(deleteId)).then(() =>
                    setOpenForDelete(false)
                  )
                }
              >
                Yes
              </Btn>
              <Btn onClick={() => setOpenForDelete(false)}>Cancel</Btn>
            </Grid>
          }
          title={<Typography variant="h6">Delete Resource Status</Typography>}
        >
          <Typography>
            Are you sure you want to delete the resource status?
          </Typography>
        </PopupModal>
      )}
    </>
  );
};

export default ResourceStatus;
