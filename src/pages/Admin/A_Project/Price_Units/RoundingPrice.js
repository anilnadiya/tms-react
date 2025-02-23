import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import {  CreateRoundingPrice, DeleteRoundingPrice,  RoundingPriceList,  UpdateRoundingPrice } from "../../../../redux/Thunk/AdminModule/AdminThunk";
import { SortAlphabetically } from "../../../../Helper/SortAlphbetically";
import GenericForm from "../../../../Components/Ui_elements/GenericForm";
import GenericTable from "../../../../Components/Ui_elements/GenericTable";
import PopupModal from "../../../../Components/Ui_elements/PopupModal";
import Btn from "../../../../Components/Ui_elements/Btn";

const RoundingPrice = () => {
  const dispatch = useDispatch();
  const { roundingprice } = useSelector((state) => state.root.AdminModule);
  const [openForDelete, setOpenForDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    rounding_id: null,
    rounding_desc: "",
    rounding_name: "",
    is_active: false,
  });
  const [errors, setErrors] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    dispatch(RoundingPriceList());
  }, [dispatch]);

  const fields = [
    {
      name: "rounding_name",
      label: "Name",
      type: "text",
      gridSize: 4,
    },
    {
      name: "rounding_desc",
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
      name: "rounding_id",
      label: "ID",
      options: {
        display: false, // Hide the column
      },
    },
    { name: "rounding_name", label: "Name" },
    { name: "rounding_desc", label: "Description" },
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
  const sortedData = SortAlphabetically(roundingprice || [], "rounding_name");

  const data = sortedData?.map((item, index) => ({
    rowNumber: index + 1, // Explicitly add sequential numbers
    rounding_id: item.rounding_id,
    rounding_name: item.rounding_name,
    rounding_desc: item.rounding_desc,
    is_active: item.is_active, // This matches the column key
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
        [name]: "", // Clear the error for the specific field
      }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData?.rounding_name.trim()) {
      newErrors.rounding_name = "Rounding Name is required";
    }
    if (!formData?.rounding_desc.trim()) {
      newErrors.rounding_desc = "Code is required";
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
        rounding_name: formData.rounding_name,
        rounding_desc: formData.rounding_desc,
      is_active: formData.is_active ? 1 : 0,
    };

    if (isEdit) {
      dispatch(
        UpdateRoundingPrice({ rounding_id: formData.rounding_id, ...payload })
      );
    } else {
      dispatch(CreateRoundingPrice(payload));
    }

    // Reset form and states
    setFormData({
        rounding_id: null,
        rounding_name: "",
        rounding_desc: "",
      status: false,
    });
    setIsEdit(false);
    setErrors({});
  };

  const handleEdit = (rowData) => {
    const selectedData = roundingprice.find(
      (item) => item.rounding_id === rowData[1]
    );
    if (selectedData) {
      setFormData({
        rounding_id: selectedData.rounding_id,
        rounding_name: selectedData.rounding_name,
        rounding_desc: selectedData.rounding_desc,
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
        displayColumns={5}
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
                  dispatch(DeleteRoundingPrice(deleteId)).then(() =>
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
          title={<Typography variant="h6">Delete Rounding Price</Typography>}
        >
          <Typography>
            Are you sure you want to delete the selected type?
          </Typography>
        </PopupModal>
      )}
    </>
  );
};

export default RoundingPrice;
