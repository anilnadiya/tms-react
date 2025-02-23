import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { CreateProjectTypes, DeleteProjectTypes, ProjectTypesList, UpdateProjectTypes } from "../../../../redux/Thunk/AdminModule/AdminThunk";
import { SortAlphabetically } from "../../../../Helper/SortAlphbetically";
import GenericForm from "../../../../Components/Ui_elements/GenericForm";
import GenericTable from "../../../../Components/Ui_elements/GenericTable";
import PopupModal from "../../../../Components/Ui_elements/PopupModal";
import Btn from "../../../../Components/Ui_elements/Btn";

const ProjectTypes = () => {
  const dispatch = useDispatch();
  const { projectTypes } = useSelector((state) => state.root.AdminModule);
  const [openForDelete, setOpenForDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    pr_type_id: null,
    code: "",
    project_name: "",
    is_active: false,
  });
  const [errors, setErrors] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    dispatch(ProjectTypesList());
  }, [dispatch]);

  const fields = [
    {
      name: "project_name",
      label: "Project Name",
      type: "text",
      gridSize: 4,
    },
    {
      name: "code",
      label: "Code",
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
      name: "pr_type_id",
      label: "ID",
      options: {
        display: false, // Hide the column
      },
    },
    { name: "project_name", label: "Project Name" },
    { name: "code", label: "Code" },
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
  const sortedData = SortAlphabetically(projectTypes || [], "project_name");

  const data = sortedData?.map((item, index) => ({
    rowNumber: index + 1, // Explicitly add sequential numbers
    pr_type_id: item.pr_type_id,
    project_name: item.project_name,
    code: item.code,
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
    if (!formData?.project_name.trim()) {
      newErrors.project_name = "Project Name is required";
    }
    if (!formData?.code.trim()) {
      newErrors.code = "Code is required";
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
        project_name: formData.project_name,
        code: formData.code,
      is_active: formData.is_active ? 1 : 0,
    };

    if (isEdit) {
      dispatch(
        UpdateProjectTypes({ pr_type_id: formData.pr_type_id, ...payload })
      );
    } else {
      dispatch(CreateProjectTypes(payload));
    }

    // Reset form and states
    setFormData({
        pr_type_id: null,
        project_name: "",
        code: "",
      status: false,
    });
    setIsEdit(false);
    setErrors({});
  };

  const handleEdit = (rowData) => {
    const selectedData = projectTypes.find(
      (item) => item.pr_type_id === rowData[1]
    );
    if (selectedData) {
      setFormData({
        pr_type_id: selectedData.pr_type_id,
        project_name: selectedData.project_name,
        code: selectedData.code,
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
       Project Types
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
                  dispatch(DeleteProjectTypes(deleteId)).then(() =>
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
          title={<Typography variant="h6">Delete Project Type</Typography>}
        >
          <Typography>
            Are you sure you want to delete the project type?
          </Typography>
        </PopupModal>
      )}
    </>
  );
};

export default ProjectTypes;
