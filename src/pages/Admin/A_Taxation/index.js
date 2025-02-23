import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateTaxation,
  DeleteTaxation,
  UpdateTaxation,
  taxationList,
} from "../../../redux/Thunk/AdminModule/AdminThunk";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import GenericTable from "../../../Components/Ui_elements/GenericTable";
import GenericForm from "../../../Components/Ui_elements/GenericForm";
import PopupModal from "../../../Components/Ui_elements/PopupModal";
import { SortAlphabetically } from "../../../Helper/SortAlphbetically";
import Btn from "../../../Components/Ui_elements/Btn";

const AdminTaxation = () => {
  const dispatch = useDispatch();
  const { taxation } = useSelector((state) => state.root.AdminModule);
  const [openForDelete, setOpenForDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    tax_id: null,
    tax_percentage: "",
    tax_name: "",
    is_active: false,
  });
  const [errors, setErrors] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    dispatch(taxationList());
  }, [dispatch]);

  const fields = [
    {
      name: "tax_name",
      label: "Tax Name",
      type: "text",
      gridSize: 4,
    },
    {
      name: "tax_percentage",
      label: "Tax Percentage",
      type: "number",
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
      name: "tax_id",
      label: "ID",
      options: {
        display: false, // Hide the column
      },
    },
    { name: "tax_name", label: "Tax Name" },
    { name: "tax_percentage", label: "Tax Percentage" },
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
  const sortedData = SortAlphabetically(taxation || [], "tax_name");

  const data = sortedData?.map((item, index) => ({
    rowNumber: index + 1, // Explicitly add sequential numbers
    tax_id: item.tax_id,
    tax_name: item.tax_name,
    tax_percentage: item.tax_percentage,
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
    if (!formData?.tax_name.trim()) {
      newErrors.tax_name = "Tax Name is required";
    }
    if (!formData.tax_percentage || isNaN(formData.tax_percentage)) {
        newErrors.tax_percentage = "Tax Percentage is required";
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
      tax_name: formData.tax_name,
      tax_percentage: formData.tax_percentage,
      is_active: formData.is_active ? 1 : 0,
    };

    if (isEdit) {
      dispatch(
        UpdateTaxation({ tax_id: formData.tax_id, ...payload })
      );
    } else {
      dispatch(CreateTaxation(payload));
    }

    // Reset form and states
    setFormData({
      tax_id: null,
      tax_name: "",
      tax_percentage: "",
      status: false,
    });
    setIsEdit(false);
    setErrors({});
  };

  const handleEdit = (rowData) => {
    const selectedData = taxation.find(
      (item) => item.tax_id === rowData[1]
    );
    if (selectedData) {
      setFormData({
        tax_id: selectedData.tax_id,
        tax_name: selectedData.tax_name,
        tax_percentage: selectedData.tax_percentage,
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
        Taxation
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
                  dispatch(DeleteTaxation(deleteId)).then(() =>
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
          title={<Typography variant="h6">Delete Taxation</Typography>}
        >
          <Typography>
            Are you sure you want to delete the taxation?
          </Typography>
        </PopupModal>
      )}
    </>
  );
};

export default AdminTaxation;
