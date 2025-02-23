import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import {  CreateJobStatus, DeleteJobStatus,  jobStatusList,  UpdateJobStatus } from "../../../../redux/Thunk/AdminModule/AdminThunk";
import { SortAlphabetically } from "../../../../Helper/SortAlphbetically";
import GenericForm from "../../../../Components/Ui_elements/GenericForm";
import GenericTable from "../../../../Components/Ui_elements/GenericTable";
import PopupModal from "../../../../Components/Ui_elements/PopupModal";
import Btn from "../../../../Components/Ui_elements/Btn";

const JobStatus = () => {
  const dispatch = useDispatch();
  const { jobstatus } = useSelector((state) => state.root.AdminModule);
  const [openForDelete, setOpenForDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    jb_status_id: null,
    job_status_name: "",
    is_default: "",
    is_active: false,
  });
  const [errors, setErrors] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    dispatch(jobStatusList());
  }, [dispatch]);

  const fields = [
    {
      name: "job_status_name",
      label: "Name of Job Status",
      type: "text",
      gridSize: 4,
    },
    { name: "is_active", label: " Active (Set as Active)", type: "checkbox", gridSize: 3 },
    { name: "is_default", label: " Set job status as default (info)", type: "checkbox", gridSize: 4 },
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
      name: "jb_status_id",
      label: "ID",
      options: {
        display: false, // Hide the column
      },
    },
    { name: "job_status_name", label: "Job Status" },
    {
      name: "is_default",
      label: "Default Status",
      options: {
        customBodyRender: (value) =>
          value === 1 ? (
            <span style={{ color: "green" }}>Default Status</span>
          ) : (
            <span style={{ color: "red" }}>{"-"}</span>
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
  const sortedData = SortAlphabetically(jobstatus || [], "job_status_name");

  const data = sortedData?.map((item, index) => ({
    rowNumber: index + 1, // Explicitly add sequential numbers
    jb_status_id: item.jb_status_id,
    job_status_name: item.job_status_name,
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
    if (!formData?.job_status_name.trim()) {
      newErrors.job_status_name = "Job Status Name is required";
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
      job_status_name: formData.job_status_name,
      is_active: formData.is_active ? 1 : 0,
      is_default: formData.is_default ? 1 : 0
    };

    if (isEdit) {
      dispatch(
        UpdateJobStatus({ jb_status_id: formData.jb_status_id, ...payload })
      );
    } else {
      dispatch(CreateJobStatus(payload));
    }

    // Reset form and states
    setFormData({
        jb_status_id: null,
        job_status_name: "",
    });
    setIsEdit(false);
    setErrors({});
  };

  const handleEdit = (rowData) => {
    const selectedData = jobstatus.find(
      (item) => item.jb_status_id === rowData[1]
    );
    if (selectedData) {
      setFormData({
        jb_status_id: selectedData.jb_status_id,
        job_status_name: selectedData.job_status_name,
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
        Job Status
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
                  dispatch(DeleteJobStatus(deleteId)).then(() =>
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
          title={<Typography variant="h6">Delete Job Status</Typography>}
        >
          <Typography>
            Are you sure you want to delete the job status?
          </Typography>
        </PopupModal>
      )}
    </>
  );
};

export default JobStatus;
