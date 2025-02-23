import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Checkbox, Grid } from "@mui/material";
import { Typography } from "@mui/material";
import {AbbreviationMatch,BusinessUnitList,CreateBusinessUnit,DeleteBusinessUnit,UpdateBusinessUnit,
} from "../../../../redux/Thunk/AdminModule/AdminThunk";
import { SortAlphabetically } from "../../../../Helper/SortAlphbetically";
import GenericTable from "../../../../Components/Ui_elements/GenericTable";
import PopupModal from "../../../../Components/Ui_elements/PopupModal";
import Btn from "../../../../Components/Ui_elements/Btn";
import TextFieldComponent from "../../../../Components/TextFieldComponent";

const BusinessUnits = () => {
  const dispatch = useDispatch();
  const { business } = useSelector((state) => state.root.AdminModule);
  const [openForDelete, setOpenForDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    center_id: null,
    abbrivation: "",
    name: "",
    order_number: "",
    is_active: false,
  });
  const [errors, setErrors] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    dispatch(BusinessUnitList());
  }, [dispatch]);

  const columns = [
    { name: "rowNumber", label: "No.", options: { sort: true } },
    { name: "center_id", label: "ID", options: { display: false } },
    { name: "name", label: "Name" },
    { name: "abbrivation", label: "Abbrivation" },
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

    const sortedData = SortAlphabetically(business || [], "name");
    const data = sortedData?.map((item, index) => ({
            rowNumber: index + 1, // Explicitly add sequential numbers
            center_id: item.center_id,
            name: item.name,
            abbrivation: item.abbrivation,
            is_active: item.is_active, // This matches the column key
    }));
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === "abbrivation") {
      const formattedValue = value
        .replace(/[^a-zA-Z]/g, "") // Remove non-alphabetic characters
        .slice(0, 3) // Limit to 3 characters
        .toUpperCase(); // Convert to uppercase

      // Update the abbreviation field
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: formattedValue,
      }));

      // Only update the order number if the abbreviation is exactly 3 letters
      if (formattedValue.length > 0) {
        const currentYear = new Date().getFullYear(); // Get the current year (e.g., 2025)
        const lastTwoDigitsOfYear = String(currentYear).slice(-2); // Extract the last two digits (e.g., 25)
        const orderNumber = `${formattedValue}${lastTwoDigitsOfYear}___`; // Append the year and ___

        setFormData((prevFormData) => ({
          ...prevFormData,
          order_number: orderNumber, // Update the order number
        }));

        // Clear errors for both "Abbreviation" and "Order Format"
        setErrors((prevErrors) => ({
          ...prevErrors,
          abbrivation: "", // Clear abbreviation error
          order_number: "", // Clear order format error
        }));

        // Call the API to check abbreviation match
        if (formattedValue.length > 0) {
          dispatch(AbbreviationMatch(formattedValue));
        }
      } else {
        // If the abbreviation is not 3 letters, clear the order number
        setFormData((prevFormData) => ({
          ...prevFormData,
          order_number: "",
        }));
      }
    } else if (name === "order_number") {
      // If the order format field is being updated manually
      const formattedValue = value
        .replace(/[^a-zA-Z0-9_]/g, "") // Allow only alphanumeric and underscore
        .slice(0, 8) // Limit to 8 characters (3 letters + 2 digits + 3 underscores)
        .toUpperCase(); // Convert to uppercase

      // Update the order format field
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: formattedValue,
      }));

      // Clear the error for the order format field
      setErrors((prevErrors) => ({
        ...prevErrors,
        order_number: "",
      }));
    } else {
      // For other fields, update normally
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }

    // Clear any existing errors for the field being updated
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData?.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData?.abbrivation.trim()) {
      newErrors.abbrivation = "Abbrivation is required";
    }

    if (!formData?.order_number.trim()) {
      newErrors.order_number = "Order Format is required";
    } else if (!/^[A-Z]{3}\d{2}___$/.test(formData.order_number)) {
      newErrors.order_number =
        "Order Format must be in the format ABC25___ (3 letters, 2 digits, 3 underscores)";
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
      name: formData.name,
      abbrivation: formData.abbrivation,
      //   order_number: formData.order_number,
      order_number: JSON.stringify([
        {
          id: "numberFormate",
          value: formData.order_number,
        },
      ]),
      is_active: formData.is_active ? 1 : 0,
    };

    if (isEdit) {
      dispatch(
        UpdateBusinessUnit({ center_id: formData.center_id, ...payload })
      );
    } else {
      dispatch(CreateBusinessUnit(payload));
    }

    // Reset form and states
    setFormData({
      center_id: null,
      name: "",
      order_number: "",
      abbrivation: "",
      status: false,
    });
    setIsEdit(false);
    setErrors({});
  };

const handleEdit = (rowData) => {
    const selectedData = business.find((item) => item.center_id === rowData[1]);
    if (selectedData) {
      // Parse the order_number if it's in the desired object format
      let orderNumberValue = "";
      if (selectedData.order_number) {
        try {
          const parsedOrderNumber = JSON.parse(selectedData.order_number);
          // Check if the order_number is an array and contains the necessary object
          if (Array.isArray(parsedOrderNumber) && parsedOrderNumber.length > 0) {
            orderNumberValue = parsedOrderNumber[0]?.value || ""; // Extract the 'value' field
          }
        } catch (e) {
          console.error("Error parsing order_number:", e);
        }
      }
  
      setFormData({
        center_id: selectedData.center_id,
        name: selectedData.name,
        order_number: orderNumberValue, // Set the value from the parsed object
        abbrivation: selectedData.abbrivation,
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
        Business Unit
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextFieldComponent
              type="text"
              id="name"
              name="name"
              label="Name"
              value={formData?.name || ""}
              onChange={handleInputChange}
              fullWidth
              error={errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextFieldComponent
              type="text"
              id="abbrivation"
              name="abbrivation"
              label="Abbrivation"
              value={formData?.abbrivation || ""}
              onChange={handleInputChange}
              fullWidth
              error={errors.abbrivation}
              disabled={isEdit}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextFieldComponent
              type="text"
              id="order_number"
              name="order_number"
              label="Order Format"
              value={formData?.order_number || ""}
              onChange={handleInputChange}
              fullWidth
              error={errors.order_number}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box display="flex" alignItems="center">
              <Checkbox
                checked={formData.is_active || false}
                onChange={(e) =>
                  setFormData({ ...formData, is_active: e.target.checked })
                }
                color="primary"
              />
              <Typography variant="body1">Active (check to active)</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Btn sx={{ mr: 1 }} type="submit">
              {isEdit ? "Update" : "Add"}
            </Btn>
          </Grid>
        </Grid>
      </form>
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
                  dispatch(DeleteBusinessUnit(deleteId)).then(() =>
                    setOpenForDelete(false)
                  )
                }
              >
                Yes
              </Btn>
              <Btn onClick={() => setOpenForDelete(false)}>Cancel</Btn>
            </Grid>
          }
          title={<Typography variant="h6">Delete Business Unit</Typography>}
        >
          <Typography>
            Are you sure you want to delete the selected type?
          </Typography>
        </PopupModal>
      )}
    </>
  );
};

export default BusinessUnits;
