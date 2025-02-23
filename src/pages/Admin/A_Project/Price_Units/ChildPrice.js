import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Typography,
  FormControl,
  Select,
  MenuItem,
  FormLabel,
} from "@mui/material";
import {
  ChildPriceList,
  CreateChildPrice,
  DeleteChildPrice,
  DropdownMasterPrice,
  DropdownMasterUnits,
  GetOneChildPrice,
  UpdateChildPrice,
} from "../../../../redux/Thunk/AdminModule/AdminThunk";
import { SortAlphabetically } from "../../../../Helper/SortAlphbetically";
import GenericTable from "../../../../Components/Ui_elements/GenericTable";
import PopupModal from "../../../../Components/Ui_elements/PopupModal";
import Btn from "../../../../Components/Ui_elements/Btn";
import TextFieldComponent from "../../../../Components/TextFieldComponent";
import DropdownComponent from "../../../../Components/DropdownComponent";

const ChildPrice = () => {
  const dispatch = useDispatch();
  const {
    childprice,
    dropdownMasterPrice,
    dropdownMasterUnits,
    getsinglechildprice,
  } = useSelector((state) => state.root.AdminModule);

  const [openForDelete, setOpenForDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    child_price_id: null,
    name: "",
    rate: "",
    unit: "",
    master_price_id: "",
    is_active: false,
  });
  const [errors, setErrors] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    dispatch(ChildPriceList());
    dispatch(DropdownMasterPrice());
    dispatch(DropdownMasterUnits());
  }, [dispatch]);

  const unitOptions = dropdownMasterUnits?.map((unit) => ({
    label: unit.unit_name,
    value: unit.unit_name,
  }));

  const priceOptions = dropdownMasterPrice?.map((price) => ({
    label: price.name,
    value: price.master_price_id,
  }));

  useEffect(() => {
    if (getsinglechildprice && isEdit) {
      setFormData({
        child_price_id: getsinglechildprice.child_price_id,
        name: getsinglechildprice.name,
        rate: getsinglechildprice.rate,
        unit: getsinglechildprice.unit,
        master_price_id: getsinglechildprice.master_price_id,
        is_active: getsinglechildprice.is_active === 1,
      });
    }
  }, [getsinglechildprice, isEdit]);

  const columns = [
    {
      name: "rowNumber",
      label: "No.",
      options: {
        sort: true,
      },
    },
    {
      name: "child_price_id",
      label: "ID",
      options: {
        display: false,
      },
    },
    { name: "name", label: "Name" },
    { name: "masterPriceName", label: "Master Price Name" },
    { name: "masterCode", label: "Code (Master)" },
    { name: "unit", label: "Unit" },
  ];

  const sortedData = SortAlphabetically(childprice || [], "name");

  const data = sortedData?.map((item, index) => ({
    rowNumber: index + 1,
    child_price_id: item.child_price_id,
    rate: item.rate,
    name: item.name,
    masterPriceName: item.masterPriceName,
    masterCode: item.masterCode,
    unit: item.unit,
    is_active: item.is_active,
  }));

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Remove the error for the corresponding field when the user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear the error for the specific field
    }));

    // Update the form data
    setFormData({
      ...formData,
      [name]: name === "rate" ? Number(value) : value, // Parse rate as a number
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData?.name.trim()) newErrors.name = "Name is required";
    if (!formData?.unit) newErrors.unit = "Unit is required";
    if (!formData?.master_price_id)
      newErrors.master_price_id = "Master Price is required";
    if (!formData?.rate || isNaN(Number(formData.rate))) {
      newErrors.rate = "Rate is required";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      rate: formData.rate,
      name: formData.name,
      unit: formData.unit,
      master_price_id: formData.master_price_id,
    };

    if (isEdit) {
      dispatch(
        UpdateChildPrice({
          child_price_id: formData.child_price_id,
          ...payload,
        })
      );
    } else {
      dispatch(CreateChildPrice(payload));
    }

    setFormData({
      child_price_id: null,
      name: "",
      rate: "",
      unit: "",
      master_price_id: "",
      is_active: false,
    });
    setIsEdit(false);
    setErrors({});
  };

  const handleEdit = (rowData) => {
    const selectedId = rowData[1];
    dispatch(GetOneChildPrice(selectedId));
    setIsEdit(true);
  };

  const handleDelete = (id) => {
    setOpenForDelete(true);
    setDeleteId(id);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextFieldComponent
              type="text"
              id="name"
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleInputChange}
              error={errors.name || ""}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextFieldComponent
              type="number"
              id="rate"
              name="rate"
              label="Rate"
              value={formData.rate}
              onChange={handleInputChange}
              error={errors.rate || ""}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DropdownComponent
              label="Unit"
              name="unit"
              value={formData.unit}
              onChange={handleInputChange}
              options={unitOptions}
              error={errors.unit || ""}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DropdownComponent
              label="Master Price"
              name="master_price_id"
              value={formData.master_price_id}
              onChange={handleInputChange}
              options={priceOptions}
              error={errors.master_price_id || ""}
            />
          </Grid>
          <Grid item xs={12}>
            <Btn type="submit">{isEdit ? "Update" : "Create"}</Btn>
          </Grid>
        </Grid>
      </form>

      <GenericTable
        columns={columns}
        data={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
        showDelete={true}
        displayColumns={6}
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
                  dispatch(DeleteChildPrice(deleteId)).then(() =>
                    setOpenForDelete(false)
                  )
                }
              >
                Yes
              </Btn>
              <Btn onClick={() => setOpenForDelete(false)}>Cancel</Btn>
            </Grid>
          }
          title={<Typography variant="h6">Delete Child Price</Typography>}
        >
          <Typography>
            Are you sure you want to delete the selected type?
          </Typography>
        </PopupModal>
      )}
    </>
  );
};

export default ChildPrice;
