import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PopupModal from "../../../../Components/Ui_elements/PopupModal";
import {
  SpecializationList,
  CreateSpecialization,
  UpdateSpecialization,
  DeleteSpecialization,
} from "../../../../redux/Thunk/AdminModule/AdminThunk";
import GenericForm from "../../../../Components/Ui_elements/GenericForm";
import GenericTable from "../../../../Components/Ui_elements/GenericTable";
import { Box, Button, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { SortAlphabetically } from "../../../../Helper/SortAlphbetically";
import Btn from "../../../../Components/Ui_elements/Btn";

const SpecializationPage = () => {
  const dispatch = useDispatch();
  const { specialization } = useSelector((state) => state.root.AdminModule);
  const [openForDelete, setOpenForDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    is_active: false,
  });
  const [errors, setErrors] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    dispatch(SpecializationList());
  }, [dispatch]);

  // Field configuration for the form
  const fields = [
    { name: "name", label: "Name", type: "text", gridSize: 4 },
    { name: "is_active", label: "Is Active", type: "checkbox", gridSize: 4 },
  ];

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      name: formData.name,
      is_active: formData.is_active ? 1 : 0,
    };

    if (isEdit) {
      dispatch(UpdateSpecialization({ id: formData.id, ...payload }));
    } else {
      dispatch(CreateSpecialization(payload));
    }

    setFormData({ id: null, name: "", is_active: false });
    setIsEdit(false);
    setErrors({});
  };

  // Handle edit
  // const handleEdit = (rowData) => {
  //   setFormData({
  //     id: rowData[0],
  //     name: rowData[1],
  //     is_active: rowData[2] === 1,
  //   });
  //   setIsEdit(true);
  // };

  const handleEdit = (rowData) => {
    const selectedData = specialization.find(
      (item) => item.id === rowData[1]
    );
  
    if (selectedData) {
      setFormData({
        id: selectedData.id,
        name: selectedData.name,
        is_active: selectedData.is_active === 1,
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

  const columns = [
    {
      name: "rowNumber",
      label: "No.",
      options: {
        sort: true, // Enable sorting for this column
      },
    },
    { name: "id", label: "ID", options: { display: false } },
    { name: "name", label: "Name" },
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

  const sortedData = SortAlphabetically(specialization || [], "name");

  const data = sortedData?.map((item, index) => ({
    rowNumber: index + 1,
    id: item.id,
    name: item.name,
    is_active: item.is_active,
  }));

  return (
    <>
    <Typography variant="h6" sx={{pb:2}}>Specialization</Typography>
    <Box className = "boxshadow">
      <GenericForm
        fields={fields}
        values={formData}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        errors={errors}
        isEdit={isEdit}
      />
      </Box>
      <Box className = "boxshadow" sx={{pl: 2,pr:1,mt:2,}}>
        <GenericTable
          columns={columns}
          data={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
          showDelete={true}
          displayColumns={4}
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
                  dispatch(DeleteSpecialization(deleteId)).then(() =>
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
          title={<Typography variant="h6">Delete Specialization</Typography>}
        >
          <Typography>
            Are you sure you want to delete the specialization?
          </Typography>
        </PopupModal>
      )}
    </>
  );
};

export default SpecializationPage;
