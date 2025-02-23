import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateDateFormate,
  dateFormateList,
  DeleteDateFormate,
  UpdateDateFormate,
} from "../../../../redux/Thunk/AdminModule/AdminThunk";
import { Button, Typography } from "@mui/material";
import GenericForm from "../../../../Components/Ui_elements/GenericForm";
import GenericTable from "../../../../Components/Ui_elements/GenericTable";
import { Grid } from "@mui/material";
import PopupModal from "../../../../Components/Ui_elements/PopupModal";
import Btn from "../../../../Components/Ui_elements/Btn";

const DateFormate = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.root.authUser);
  const { dateFormate } = useSelector((state) => state.root.AdminModule);

  useEffect(() => {
    dispatch(dateFormateList());
  }, []);

  const [openForDelete, setOpenForDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    dateformat_id: null,
    dateformat: "",
    dateSeparator: "",
    is_active: false,
    select2_val: "",
  });
  const [errors, setErrors] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const fields = [
    {
      name: "dateformat",
      label: "Select Date Format",
      type: "dropdown",
      gridSize: 4,
      options: [
        { label: "YYYY-MM-DD", value: "YYYY-MM-DD" },
        { label: "DD-MM-YYYY", value: "DD-MM-YYYY" },
        { label: "MM-DD-YYYY", value: "MM-DD-YYYY" },
      ],
    },
    {
      name: "dateSeparator",
      label: "Date Separator",
      type: "dropdown",
      gridSize: 4,
      options: [
        { label: "/", value: "/" },
        { label: ",", value: "," },
        { label: ".", value: "." },
      ],
    },
    { name: "is_active", label: "Is Active", type: "checkbox", gridSize: 4 },
  ];

  const columns = [
    { name: "rowNumber", label: "No.", options: { sort: true } },
    { name: "dateformat_id", label: "ID", options: { display: false } },
    { name: "dateformat", label: "Date Format" },
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

  const data = dateFormate?.map((item, index) => ({
    rowNumber: index + 1,
    dateformat_id: item.dateformat_id,
    dateformat: item.dateformat,
    is_active: item.is_active,
  }));

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.dateformat?.value) {
      newErrors.dateformat = "Date Format is required";
    }
    if (!formData.dateSeparator?.value) {
      newErrors.dateSeparator = "Date Separator is required";
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
    // Find the index of the selected date format option
    const dateFormatIndex = fields[0].options.findIndex(
      (option) => option.value === formData.dateformat?.value
    );

    const payload = {
      dateFormat: formData.dateformat?.value || "", // Extract the value
      dateSeparator: formData.dateSeparator?.value || "", // Extract the value
      is_active: formData.is_active ? 1 : 0,
      iUserId: user.iUserId,
      select2_val: dateFormatIndex !== -1 ? dateFormatIndex : null, // Add the index of the selected value
    };

    if (isEdit) {
      dispatch(
        UpdateDateFormate({ dateformat_id: formData.dateformat_id, ...payload })
      );
    } else {
      dispatch(CreateDateFormate(payload));
    }

    setFormData({
      dateformat_id: null,
      dateformat: "",
      dateSeparator: "",
      is_active: false,
    });
    setIsEdit(false);
    setErrors({});
  };

  const handleEdit = (rowData) => {
    const selectedData = dateFormate.find(
      (item) => item.dateformat_id === rowData[1]
    );

    if (selectedData) {
      setFormData({
        dateformat_id: selectedData.dateformat_id,
        dateformat: {
          label: selectedData.dateformat,
          value: selectedData.dateformat,
        },
        dateSeparator: {
          label: selectedData.dateSeparator,
          value: selectedData.dateSeparator,
        },
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
      <Typography variant="h6" sx={{ py: 2 }}>
        Date Format
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
                  dispatch(DeleteDateFormate(deleteId)).then(() =>
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

export default DateFormate;
