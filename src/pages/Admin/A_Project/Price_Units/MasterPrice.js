import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { CreateMasterPrice,  DeleteMasterPrice,  MasterPriceList,  UpdateMasterPrice} from "../../../../redux/Thunk/AdminModule/AdminThunk";
import { SortAlphabetically } from "../../../../Helper/SortAlphbetically";
import GenericForm from "../../../../Components/Ui_elements/GenericForm";
import GenericTable from "../../../../Components/Ui_elements/GenericTable";
import PopupModal from "../../../../Components/Ui_elements/PopupModal";
import Btn from "../../../../Components/Ui_elements/Btn";

const MasterPrice = () => {
  const dispatch = useDispatch();
  const { masterprice } = useSelector((state) => state.root.AdminModule);
  const [openForDelete, setOpenForDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    master_price_id: null,
    code: "",
    name: "",
    is_active: false,
  });
  const [errors, setErrors] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    dispatch(MasterPriceList());
  }, [dispatch]);

  const fields = [
    {
      name: "name",
      label: "Name",
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
      name: "master_price_id",
      label: "ID",
      options: {
        display: false, // Hide the column
      },
    },
    { name: "name", label: "Name" },
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
  const sortedData = SortAlphabetically(masterprice || [], "name");

  const data = sortedData?.map((item, index) => ({
    rowNumber: index + 1, // Explicitly add sequential numbers
    master_price_id: item.master_price_id,
    name: item.name,
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
    setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "", // Clear the error for the specific field
      }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData?.name.trim()) {
      newErrors.name = "Name is required";
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
        name: formData.name,
        code: formData.code,
      is_active: formData.is_active ? 1 : 0,
    };

    if (isEdit) {
      dispatch(
        UpdateMasterPrice({ master_price_id: formData.master_price_id, ...payload })
      );
    } else {
      dispatch(CreateMasterPrice(payload));
    }

    // Reset form and states
    setFormData({
        master_price_id: null,
        name: "",
        code: "",
      status: false,
    });
    setIsEdit(false);
    setErrors({});
  };

  const handleEdit = (rowData) => {
    const selectedData = masterprice.find(
      (item) => item.master_price_id === rowData[1]
    );
    if (selectedData) {
      setFormData({
        master_price_id: selectedData.master_price_id,
        name: selectedData.name,
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
                  dispatch(DeleteMasterPrice(deleteId)).then(() =>
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
          title={<Typography variant="h6">Delete Master Price</Typography>}
        >
          <Typography>
            Are you sure you want to delete the selected type?
          </Typography>
        </PopupModal>
      )}
    </>
  );
};

export default MasterPrice;
