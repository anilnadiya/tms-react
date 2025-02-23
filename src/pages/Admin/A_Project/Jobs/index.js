import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { CreateJobs, DeleteJobs, jobList, UpdateJobs, } from "../../../../redux/Thunk/AdminModule/AdminThunk";
import { SortAlphabetically } from "../../../../Helper/SortAlphbetically";
import GenericForm from "../../../../Components/Ui_elements/GenericForm";
import GenericTable from "../../../../Components/Ui_elements/GenericTable";
import PopupModal from "../../../../Components/Ui_elements/PopupModal";
import Btn from "../../../../Components/Ui_elements/Btn";

const Jobs = () => {
  const dispatch = useDispatch();
  const { jobs } = useSelector((state) => state.root.AdminModule);
  const [openForDelete, setOpenForDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    job_id: null,
    job_code: "",
    service_name: "",
    is_active: false,
  });
  const [errors, setErrors] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    dispatch(jobList());
  }, [dispatch]);

  const fields = [
    {
      name: "service_name",
      label: "Job Name",
      type: "text",
      gridSize: 4,
    },
    {
      name: "job_code",
      label: "Job Code",
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
      name: "job_id",
      label: "ID",
      options: {
        display: false, // Hide the column
      },
    },
    { name: "service_name", label: "Job Name" },
    { name: "job_code", label: "Job Code" },
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
  const sortedData = SortAlphabetically(jobs || [], "service_name");

  const data = sortedData?.map((item, index) => ({
    rowNumber: index + 1, // Explicitly add sequential numbers
    job_id: item.job_id,
    service_name: item.service_name,
    job_code: item.job_code,
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
    if (!formData?.service_name.trim()) {
      newErrors.service_name = "Job Name is required";
    }
    if (!formData?.job_code.trim()) {
      newErrors.job_code = "Job Code is required";
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
        service_name: formData.service_name,
        job_code: formData.job_code,
      is_active: formData.is_active ? 1 : 0,
    };

    if (isEdit) {
      dispatch(
        UpdateJobs({ job_id: formData.job_id, ...payload })
      );
    } else {
      dispatch(CreateJobs(payload));
    }

    // Reset form and states
    setFormData({
        job_id: null,
        service_name: "",
        job_code: "",
      status: false,
    });
    setIsEdit(false);
    setErrors({});
  };

  const handleEdit = (rowData) => {
    const selectedData = jobs.find(
      (item) => item.job_id === rowData[1]
    );
    if (selectedData) {
      setFormData({
        job_id: selectedData.job_id,
        service_name: selectedData.service_name,
        job_code: selectedData.job_code,
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
       Jobs
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
                  dispatch(DeleteJobs(deleteId)).then(() =>
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
          title={<Typography variant="h6">Delete Job</Typography>}
        >
          <Typography>
            Are you sure you want to delete the job type?
          </Typography>
        </PopupModal>
      )}
    </>
  );
};

export default Jobs;
