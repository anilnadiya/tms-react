import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateDecimalSeperator,
  decimalSeperatorList,
  DeleteDecimalSeperator,
  UpdateDecimalSeperator,
} from "../../../../redux/Thunk/AdminModule/AdminThunk";
import { Box, Button, Typography } from "@mui/material";
import GenericForm from "../../../../Components/Ui_elements/GenericForm";
import GenericTable from "../../../../Components/Ui_elements/GenericTable";
import { Grid } from "@mui/material";
import PopupModal from "../../../../Components/Ui_elements/PopupModal";
import Btn from "../../../../Components/Ui_elements/Btn";

const DecimalSeprator = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.root.authUser);
  const { decimalSeparator } = useSelector((state) => state.root.AdminModule);

  useEffect(() => {
    dispatch(decimalSeperatorList());
  }, []);

  const [openForDelete, setOpenForDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    separator_id: null,
    separatorChar: "",
    decimal_number: "",
    is_active: false,
  });
  const [errors, setErrors] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const fields = [
    {
      name: "separatorChar",
      label: "Select Decimal Seprator",
      type: "dropdown",
      gridSize: 4,
      options: [
        { label: ".", value: "." },
        { label: ",", value: "," },
      ],
    },
    {
      name: "decimal_number",
      label: "Decimal Number",
      type: "number",
      gridSize: 4,
    },
    { name: "is_active", label: "Is Active", type: "checkbox", gridSize: 4 },
  ];

  const columns = [
    { name: "rowNumber", label: "No.", options: { sort: true } },
    { name: "separator_id", label: "ID", options: { display: false } },
    { name: "separatorChar", label: "Decimal Seprator" },
    { name: "decimal_number", label: "Decimal Number" },
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

  const data = decimalSeparator?.map((item, index) => ({
    rowNumber: index + 1,
    separator_id: item.separator_id,
    separatorChar: item.separatorChar,
    decimal_number: item.decimal_number,
    is_active: item.is_active,
  }));

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
    if (!formData.separatorChar) {
      newErrors.separatorChar = "Decimal separator is required";
    }
    if (!formData.decimal_number || isNaN(formData.decimal_number)) {
      newErrors.decimal_number = "Decimal number is required";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Stop submission if there are errors
    }

    const payload = {
      separatorChar: formData.separatorChar?.value || "", // Extract the value
      decimal_number: formData.decimal_number || "", // Extract the value
      is_active: formData.is_active ? 1 : 0,
      iUserId: user.iUserId,
    };

    if (isEdit) {
      dispatch(
        UpdateDecimalSeperator({
          dateformat_id: formData.dateformat_id,
          ...payload,
        })
      );
    } else {
      dispatch(CreateDecimalSeperator(payload));
    }

    setFormData({
      separatorChar: null,
      decimal_number: "",
      separator_id: "",
      is_active: false,
    });
    setIsEdit(false);
    setErrors({});
  };

  const handleEdit = (rowData) => {
    const selectedData = decimalSeparator.find(
      (item) => item.separator_id === rowData[1]
    );

    if (selectedData) {
      setFormData({
        separator_id: selectedData.separator_id,
        separatorChar: {
          label: selectedData.separatorChar,
          value: selectedData.separatorChar,
        },
        decimal_number: selectedData.decimal_number,
        is_active: selectedData.is_active === 1,
      });
      setIsEdit(true);
    }
  };

  const handleDelete = (id) => {
    setOpenForDelete(true);
    setDeleteId(id);
  };
  return (
    <>
      <Box className = "boxshadow">
        <Typography variant="h6" sx={{ py: 2 }}>
          Decimal Seprator
        </Typography>
        <GenericForm
          fields={fields}
          values={formData}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          errors={errors}
          isEdit={isEdit}
        />
      </Box>
      <Box className = "boxshadow">

      <GenericTable
        columns={columns}
        data={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
        showDelete={true}
        displayColumns={5}
        displayRows={10}
      />
      </Box>
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
                  dispatch(DeleteDecimalSeperator(deleteId)).then(() =>
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
          title={<Typography variant="h6">Delete Decimal Seprator</Typography>}
        >
          <Typography>
            Are you sure you want to delete the decimal seprator?
          </Typography>
        </PopupModal>
      )}
    </>
  );
};

export default DecimalSeprator;
