import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateResourcePosition,
  DeleteResourcePosition,
  resourcePositionList,
  UpdateResourcePosition,
} from "../../../redux/Thunk/AdminModule/AdminThunk";
import GenericTable from "../../../Components/Ui_elements/GenericTable";
import GenericForm from "../../../Components/Ui_elements/GenericForm";
import { Typography, Grid } from "@mui/material";
import PopupModal from "../../../Components/Ui_elements/PopupModal";
import { SortAlphabetically } from "../../../Helper/SortAlphbetically";
import Btn from "../../../Components/Ui_elements/Btn";

const ResourcePosition = () => {
  const dispatch = useDispatch();
  const { resource_position } = useSelector((state) => state.root.AdminModule);
  const [openForDelete, setOpenForDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    position_id: null,
    position_name: "",
    status: false,
  });
  const [errors, setErrors] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    dispatch(resourcePositionList());
  }, [dispatch]);

  const fields = [
    {
      name: "position_name",
      label: "Name Of Resource Position",
      type: "text",
      gridSize: 4,
    },
    { name: "status", label: "Is Active", type: "checkbox" },
  ];

  const columns = [
    {
      name: "rowNumber",
      label: "No.",
      options: {
        sort: true, // Enable sorting for this column
      },
    },
    { name: "position_id", label: "ID", options: { display: false } },
    { name: "position_name", label: "Name of Resource Position" },
    {
      name: "status",
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
  const sortedData = SortAlphabetically(
    resource_position || [],
    "position_name"
  );

  const data = sortedData?.map((item, index) => ({
    rowNumber: index + 1,
    position_id: item.position_id,
    position_name: item.position_name,
    status: item.status, // This matches the column key
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
    if (!formData.position_name.trim()) {
      newErrors.position_name = "Position Name is required";
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
      position_name: formData.position_name,
      status: formData.status ? 1 : 0,
    };

    if (isEdit) {
      dispatch(
        UpdateResourcePosition({
          position_id: formData.position_id,
          ...payload,
        })
      );
    } else {
      dispatch(CreateResourcePosition(payload));
    }

    // Reset form and states
    setFormData({ position_id: null, position_name: "", status: false });
    setIsEdit(false);
    setErrors({});
  };

  // Handle edit

  const handleEdit = (rowData) => {
    const selectedData = resource_position.find(
      (item) => item.position_id === rowData[1]
    );

    if (selectedData) {
      setFormData({
        position_id: selectedData.position_id,
        position_name: selectedData.position_name,
        status: selectedData.status === 1,
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
        Resource Position
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
                  dispatch(DeleteResourcePosition(deleteId)).then(() =>
                    setOpenForDelete(false)
                  )
                }
              >
                Yes
              </Btn>
              <Btn onClick={() => setOpenForDelete(false)}>Cancel</Btn>
            </Grid>
          }
          title={<Typography variant="h6">Delete Resource Position</Typography>}
        >
          <Typography>
            Are you sure you want to delete the resource position?
          </Typography>
        </PopupModal>
      )}
    </>
  );
};

export default ResourcePosition;
