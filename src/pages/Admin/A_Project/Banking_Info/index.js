import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Grid,Typography,FormControl,Select,MenuItem,  FormLabel,} from "@mui/material";
import {BankingInfoList,CreateBankingInfo,CurrencyCode,DeleteBankingInfo,UpdateBankingInfo,
} from "../../../../redux/Thunk/AdminModule/AdminThunk";
import { SortAlphabetically } from "../../../../Helper/SortAlphbetically";
import GenericTable from "../../../../Components/Ui_elements/GenericTable";
import PopupModal from "../../../../Components/Ui_elements/PopupModal";
import Btn from "../../../../Components/Ui_elements/Btn";
import TextFieldComponent from "../../../../Components/TextFieldComponent";

const BankingInfo = () => {
  const dispatch = useDispatch();
  const { bankinfo, currencyCode } = useSelector(
    (state) => state.root.AdminModule
  );

  const [openForDelete, setOpenForDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    bank_id: null,
    bank_name: "",
    holder_name: "",
    currency_code: "",
    iban: "",
    swift_bic: "",
    bank_code: "",
    routing_number: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    dispatch(BankingInfoList());
    dispatch(CurrencyCode());
  }, [dispatch]);

  const columns = [
    {
      name: "rowNumber",
      label: "No.",
      options: {
        sort: true,
      },
    },
    {
      name: "bank_id",
      label: "ID",
      options: {
        display: false,
      },
    },
    { name: "bank_name", label: "Bank Name" },
    { name: "holder_name", label: "Holder Name" },
    { name: "currency_code", label: "Currency Code" },
    { name: "iban", label: "IBAN" },
    { name: "address", label: "Address" },
  ];

  const sortedData = SortAlphabetically(bankinfo || [], "bank_name");

  const data = sortedData?.map((item, index) => ({
    rowNumber: index + 1,
    bank_id: item.bank_id,
    bank_name: item.bank_name,
    holder_name: item.holder_name,
    currency_code: item.currency_code,
    iban: item.iban,
    swift_bic: item.swift_bic,
    bank_code: item.bank_code,
    routing_number: item.routing_number,
    address: item.address,
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
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData?.bank_name) newErrors.bank_name = "Bank Name is required";
    if (!formData?.holder_name)
      newErrors.holder_name = "Holder Name is required";
    if (!formData?.currency_code)
      newErrors.currency_code = "Currency Code is required";
    if (!formData?.iban) newErrors.iban = "IBAN is required";
    if (!formData?.swift_bic) newErrors.swift_bic = "SWIFT/BIC is required";
    if (!formData?.bank_code) newErrors.bank_code = "Bank Code is required";
    if (!formData?.routing_number)
      newErrors.routing_number = "Routing Number is required";
    if (!formData?.address) newErrors.address = "Address is required";

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
      bank_name: formData.bank_name,
      holder_name: formData.holder_name,
      currency_code: formData.currency_code,
      iban: formData.iban,
      swift_bic: formData.swift_bic,
      bank_code: formData.bank_code,
      routing_number: formData.routing_number,
      address: formData.address,
    };

    if (isEdit) {
      dispatch(UpdateBankingInfo({ bank_id: formData.bank_id, ...payload }));
    } else {
      dispatch(CreateBankingInfo(payload));
    }

    setFormData({
      bank_id: null,
      bank_name: "",
      holder_name: "",
      currency_code: "",
      iban: "",
      swift_bic: "",
      bank_code: "",
      routing_number: "",
      address: "",
    });
    setIsEdit(false);
    setErrors({});
  };

  const handleEdit = (rowData) => {
    const selectedData = bankinfo.find((item) => item.bank_id === rowData[1]);
    if (selectedData) {
      setFormData({
        bank_id: selectedData.bank_id,
        bank_name: selectedData.bank_name,
        holder_name: selectedData.holder_name,
        currency_code: selectedData.currency_code,
        iban: selectedData.iban,
        swift_bic: selectedData.swift_bic,
        bank_code: selectedData.bank_code,
        routing_number: selectedData.routing_number,
        address: selectedData.address,
      });
      setIsEdit(true);
    } else {
      console.error("Unable to find the selected data for editing.");
    }
  };

  const handleDelete = (id) => {
    setOpenForDelete(true);
    setDeleteId(id);
  };

  return (
    <>
    
    <Typography variant="h6" sx={{ py: 2 }}>
          Banking Info
        </Typography>
        
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextFieldComponent
              type="text"
              id="bank_name"
              name="bank_name"
              label="Bank Name"
              value={formData.bank_name}
              onChange={handleInputChange}
              error={errors.bank_name || ""}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextFieldComponent
              type="text"
              id="holder_name"
              name="holder_name"
              label="Holder Name"
              value={formData.holder_name}
              onChange={handleInputChange}
              error={errors.holder_name || ""}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextFieldComponent
              type="text"
              id="iban"
              name="iban"
              label="IBAN"
              value={formData.iban}
              onChange={handleInputChange}
              error={errors.iban || ""}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextFieldComponent
              type="text"
              id="swift_bic"
              name="swift_bic"
              label="SWIFT/BIC"
              value={formData.swift_bic}
              onChange={handleInputChange}
              error={errors.swift_bic || ""}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextFieldComponent
              type="text"
              id="bank_code"
              name="bank_code"
              label="Bank Code"
              value={formData.bank_code}
              onChange={handleInputChange}
              error={errors.bank_code || ""}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextFieldComponent
              type="text"
              id="routing_number"
              name="routing_number"
              label="Routing Number"
              value={formData.routing_number}
              onChange={handleInputChange}
              error={errors.routing_number || ""}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextFieldComponent
              type="text"
              id="address"
              name="address"
              label="Address"
              value={formData.address}
              onChange={handleInputChange}
              error={errors.address || ""}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth error={Boolean(errors.currency_code)}>
            {errors.currency_code ? 
                <FormLabel component="legend" style={{ marginBottom: "8px", color: "red" }}>{errors.currency_code}</FormLabel>
              :
              <FormLabel component="legend" style={{ marginBottom: "8px" }}>
                Currency Code
              </FormLabel>
            }
              <Select
                name="currency_code"
                value={formData.currency_code}
                onChange={handleInputChange}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Select a currency
                </MenuItem>
                {currencyCode &&
                  Object.entries(currencyCode).map(([key, value]) => (
                    <MenuItem key={key} value={`${key},${value.symbol}`}>
                      {`${value.name} (${value.symbol})`}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
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
                  dispatch(DeleteBankingInfo(deleteId)).then(() =>
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

export default BankingInfo;
