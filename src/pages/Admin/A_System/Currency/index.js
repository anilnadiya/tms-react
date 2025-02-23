import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {CreateCurrency,CurrencyCode,currencyList,DeleteCurrency,UpdateCurrency,
} from "../../../../redux/Thunk/AdminModule/AdminThunk";
import {Typography,Grid,Checkbox,FormControlLabel,} from "@mui/material";
import GenericTable from "../../../../Components/Ui_elements/GenericTable";
import { SortAlphabetically } from "../../../../Helper/SortAlphbetically";
import PopupModal from "../../../../Components/Ui_elements/PopupModal";
import DropdownWithSearch from "../../../../Components/DropdownWithSearch";
import Btn from "../../../../Components/Ui_elements/Btn";

const Currency = () => {
  const dispatch = useDispatch();
  const [openForDelete, setOpenForDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const { currency, currencyCode } = useSelector(
    (state) => state.root.AdminModule
  );

  const [formData, setFormData] = useState({
    currency_id: null,
    currency_name: "",
    country_name: "",
    curDef: "",
    currency_code: "",
    current_currency_rate: "",
    ob_exchange_rate_auto: false,
  });
  const [errors, setErrors] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    dispatch(currencyList());
    dispatch(CurrencyCode());
  }, [dispatch]);

  const columns = [
    { name: "rowNumber", label: "No.", options: { sort: true } },
    { name: "currency_id", label: "ID", options: { display: false } },
    { name: "currency_name", label: "Currency Name" },
    { name: "country_name", label: "ISO Code" },
    {
      name: "current_curency_rate",
      label: "Rate",
      options: {
        customBodyRender: (value) => `1.0 EUR = ${value} BGN`,
      },
    },
    {
      name: "ob_exchange_rate_auto",
      label: "Exchange Rate Automatically at Night",
      options: {
        customBodyRender: (value) =>
          value ? (
            <span style={{ color: "green" }}>Active</span>
          ) : (
            <span style={{ color: "red" }}>Inactive</span>
          ),
      },
    },
  ];

  const sortedData = SortAlphabetically(currency || [], "currency_name");

  const data = sortedData?.map((item, index) => ({
    rowNumber: index + 1,
    currency_id: item.currency_id,
    currency_name: item.currency_name,
    country_name: item.country_name,
    current_curency_rate: item.current_curency_rate,
    ob_exchange_rate_auto: item.ob_exchange_rate_auto,
  }));

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", 
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.country_name) {
      newErrors.country_name = "Country Name is required";
    } else if (!currencyCode[formData.country_name]) {
      newErrors.country_name = "Invalid country selected";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Get selected country details from currencyCode
    const selectedCountry = currencyCode[formData.country_name];
    if (!selectedCountry) {
      setErrors({ country_name: "Invalid country selected" });
      return;
    }

    // Build the payload
    const payload = {
      country_name: formData.country_name, // e.g., "CAD"
      curDef: "EUR", // Default value as per requirements
      currency_code: `${formData.country_name},${selectedCountry.symbol}`, // e.g., "CAD,$"
      currency_name: selectedCountry.name, // e.g., "Canadian Dollar"
      ob_exchange_rate_auto: formData.ob_exchange_rate_auto ? 1 : 0, // Checkbox status
    };

    // Dispatch create or update action
    if (isEdit) {
      dispatch(
        UpdateCurrency({ currency_id: formData.currency_id, ...payload })
      );
    } else {
      dispatch(CreateCurrency(payload));
    }

    // Reset the form
    setFormData({
      currency_id: null,
      currency_name: "",
      country_name: "",
      curDef: "",
      currency_code: "",
      ob_exchange_rate_auto: false,
    });
    setIsEdit(false);
    setErrors({});
  };

  const handleEdit = (rowData) => {
    const selectedData = currency.find(
      (item) => item.currency_id === rowData[1]
    );
    if (selectedData) {
      setFormData({
        currency_id: selectedData.currency_id,
        currency_name: selectedData.currency_name,
        country_name: selectedData.country_name,
        ob_exchange_rate_auto: selectedData.ob_exchange_rate_auto === 1,
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
        Currency
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <DropdownWithSearch
              options={Object.keys(currencyCode || {}).map((key) => ({
                label: key,
                value: key,
              }))}
              label="Country Code"
              selectedValue={
                formData.country_name
                  ? {
                      label: formData.country_name,
                      value: formData.country_name,
                    }
                  : null
              }
              onSelect={(selected) => {
                handleInputChange({
                  target: {
                    name: "country_name",
                    value: selected ? selected.value : "",
                  },
                });
              }}
              fullWidth
              isclearable
            />
             {errors.country_name && (
    <Typography variant="caption" color="error" sx={{ marginTop: 1 }}>
      {errors.country_name}
    </Typography>
  )}
            
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControlLabel
              control={
                <Checkbox
                  name="ob_exchange_rate_auto"
                  checked={formData.ob_exchange_rate_auto}
                  onChange={handleInputChange}
                />
              }
              label="Obtain Exchange Rate Automatically at Night"
            />
          </Grid>
          <Grid item xs={12}>
            <Btn type="submit">
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
                  dispatch(DeleteCurrency(deleteId)).then(() =>
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
          title={<Typography variant="h6">Delete Currency</Typography>}
        >
          <Typography>Are you sure you want to delete the currency?</Typography>
        </PopupModal>
      )}
    </>
  );
};

export default Currency;
