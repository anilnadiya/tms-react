import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateClientStatus,
  DeleteClientStatus,
  clientStatusList,
  UpdateClientStatus,
} from "../../../redux/Thunk/AdminModule/AdminThunk";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import GenericTable from "../../../Components/Ui_elements/GenericTable";
import GenericForm from "../../../Components/Ui_elements/GenericForm";
import PopupModal from "../../../Components/Ui_elements/PopupModal";
import { SortAlphabetically } from "../../../Helper/SortAlphbetically";
import Btn from "../../../Components/Ui_elements/Btn";

const ClientStatus = () => {
  const dispatch = useDispatch();
  const { client_status } = useSelector((state) => state.root.AdminModule);
  const [openForDelete, setOpenForDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    status_id: null,
    description: "",
    status_name: "",
    is_active: false,
  });
  const [errors, setErrors] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    dispatch(clientStatusList());
  }, [dispatch]);

  const fields = [
    {
      name: "status_name",
      label: "Name Of Client Status",
      type: "text",
      gridSize: 4,
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      gridSize: 4,
    },
    { name: "is_active", label: "Is Active", type: "checkbox", gridSize: 4 },
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
      name: "status_id",
      label: "ID",
      options: {
        display: false, // Hide the column
      },
    },
    { name: "status_name", label: "Name of Client Status" },
    {
      name: "is_active",
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
  const sortedData = SortAlphabetically(client_status || [], "status_name");

  const data = sortedData?.map((item, index) => ({
    rowNumber: index + 1, // Explicitly add sequential numbers
    status_id: item.status_id,
    status_name: item.status_name,
    description: item.description,
    is_active: item.is_active, // This matches the column key
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
    if (!formData?.status_name.trim()) {
      newErrors.status_name = "Status Name is required";
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
      status_name: formData.status_name,
      status_type: 2,
      description: formData.description,
      is_active: formData.is_active ? 1 : 0,
    };

    if (isEdit) {
      dispatch(
        UpdateClientStatus({ status_id: formData.status_id, ...payload })
      );
    } else {
      dispatch(CreateClientStatus(payload));
    }

    // Reset form and states
    setFormData({
      status_id: null,
      status_name: "",
      description: "",
      status: false,
    });
    setIsEdit(false);
    setErrors({});
  };

  const handleEdit = (rowData) => {
    const selectedData = client_status.find(
      (item) => item.status_id === rowData[1]
    );
    if (selectedData) {
      setFormData({
        status_id: selectedData.status_id,
        status_name: selectedData.status_name,
        description: selectedData.description,
        is_active: selectedData.is_active,
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
        Client Status
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
                  dispatch(DeleteClientStatus(deleteId)).then(() =>
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
          title={<Typography variant="h6">Delete Client Status</Typography>}
        >
          <Typography>
            Are you sure you want to delete the client status?
          </Typography>
        </PopupModal>
      )}
    </>
  );
};

export default ClientStatus;
