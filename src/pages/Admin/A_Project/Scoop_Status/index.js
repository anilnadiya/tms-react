import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import {  CreateScoopStatus, DeleteScoopStatus, scoopStatusList, UpdateScoopStatus } from "../../../../redux/Thunk/AdminModule/AdminThunk";
import { SortAlphabetically } from "../../../../Helper/SortAlphbetically";
import GenericForm from "../../../../Components/Ui_elements/GenericForm";
import GenericTable from "../../../../Components/Ui_elements/GenericTable";
import PopupModal from "../../../../Components/Ui_elements/PopupModal";
import Btn from "../../../../Components/Ui_elements/Btn";

const ScoopStatus = () => {
  const dispatch = useDispatch();
  const { scoop } = useSelector((state) => state.root.AdminModule);
  const [openForDelete, setOpenForDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    item_status_id: null,
    item_status_name: "",
    is_default: "",
    is_active: false,
  });
  const [errors, setErrors] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    dispatch(scoopStatusList());
  }, [dispatch]);

  const fields = [
    {
      name: "item_status_name",
      label: "Scoop Status Name",
      type: "text",
      gridSize: 4,
    },
    { name: "is_active", label: " Active (Set as Active)", type: "checkbox", gridSize: 3 },
    { name: "is_default", label: " Set project status as default (info)", type: "checkbox", gridSize: 4 },
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
      name: "item_status_id",
      label: "ID",
      options: {
        display: false, // Hide the column
      },
    },
    { name: "item_status_name", label: "Scoop Status Name" },
    {
      name: "is_default",
      label: "Default Status",
      options: {
        customBodyRender: (value) =>
          value === 1 ? (
            <span style={{ color: "green" }}>Default Status</span>
          ) : (
            <span style={{ color: "red" }}>{""}</span>
          ),
      },
    },
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
  const sortedData = SortAlphabetically(scoop || [], "item_status_name");

  const data = sortedData?.map((item, index) => ({
    rowNumber: index + 1, // Explicitly add sequential numbers
    item_status_id: item.item_status_id,
    item_status_name: item.item_status_name,
    is_default: item.is_default,
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
    if (!formData?.item_status_name.trim()) {
      newErrors.item_status_name = "Scoop Status Name is required";
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
      item_status_name: formData.item_status_name,
      is_active: formData.is_active ? 1 : 0,
      is_default: formData.is_default ? 1 : 0
    };

    if (isEdit) {
      dispatch(
        UpdateScoopStatus({ item_status_id: formData.item_status_id, ...payload })
      );
    } else {
      dispatch(CreateScoopStatus(payload));
    }

    // Reset form and states
    setFormData({
        item_status_id: null,
        item_status_name: "",
    });
    setIsEdit(false);
    setErrors({});
  };

  const handleEdit = (rowData) => {
    const selectedData = scoop.find(
      (item) => item.item_status_id === rowData[1]
    );
    if (selectedData) {
      setFormData({
        item_status_id: selectedData.item_status_id,
        item_status_name: selectedData.item_status_name,
        is_default: selectedData.is_default,
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
        Project Status
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
                  dispatch(DeleteScoopStatus(deleteId)).then(() =>
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
          title={<Typography variant="h6">Delete Project Status</Typography>}
        >
          <Typography>
            Are you sure you want to delete the project status?
          </Typography>
        </PopupModal>
      )}
    </>
  );
};

export default ScoopStatus;
