import React, { useEffect } from "react";
import TextFieldComponent from "../../../../Components/TextFieldComponent";
import { Grid, Grid2, Typography } from "@mui/material";
import Btn from "../../../../Components/Ui_elements/Btn";
import {  ClientPaymentList, CreateClientPayment, TaxDropdown, UpdateClientPayment } from "../../../../redux/Thunk/ClientModule/ClientThunk";
import { useDispatch, useSelector } from "react-redux";
import DropdownComponent from "../../../../Components/DropdownComponent";
import { useParams } from "react-router-dom";

const Step4 = ({ buttonref, step4Data, setStep4Data, errors, setErrors }) => {
  const dispatch = useDispatch();
  const {clientStepperData,taxname,client_payment_list} = useSelector((state) => state.root.ClientModule);
  const {id} = useParams();
  useEffect(()=>{
    dispatch(TaxDropdown())
  },[dispatch])

  useEffect(()=>{
    if(id || clientStepperData?.iClientId){
      dispatch(ClientPaymentList(id ? id : clientStepperData.iClientId))
    }
  },[id])

  useEffect(() => {
  if (client_payment_list && client_payment_list.vPaymentInfo && id) {
    const parsedPaymentInfo = JSON.parse(client_payment_list.vPaymentInfo);

    setStep4Data({
      accounting_name: parsedPaymentInfo.accounting_name || "",
      tax_id: parsedPaymentInfo.tax_id || "",
      memos: parsedPaymentInfo.memos || "",
      tax_rate: client_payment_list.tax_rate || "",
      invoice_no_of_days: client_payment_list.invoice_no_of_days || "",
    });
  }
}, [client_payment_list]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setStep4Data((prevData) => ({
      ...prevData,
      [name]: value, // Fallback if option not found
    }));

    // Remove the error for the corresponding field when the user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear the error for the specific field
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Check each field and add errors to newErrors if validation fails
    if (!step4Data.accounting_name.trim()) {
      newErrors.accounting_name = "Accounting Name is required";
    }
    if (!step4Data.tax_id.trim()) {
      newErrors.tax_id = "Vat Number is required";
    }
    if (!step4Data.tax_rate) {
      newErrors.tax_rate = "Tax Rate is required";
    }
    if (!step4Data.invoice_no_of_days.trim()) {
      newErrors.invoice_no_of_days = "Invoice No of Days is required";
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

    const formattedPayload = {
      iClientId: id || clientStepperData?.iClientId,
      invoice_no_of_days: step4Data.invoice_no_of_days || "",
      iType: 2 , // Passing it static 
      tax_rate: step4Data.tax_rate,
      vPaymentInfo: JSON.stringify({
        accounting_name: step4Data.accounting_name ? step4Data.accounting_name : "",
        tax_id: step4Data.tax_id ? step4Data.tax_id : "",
        memos: step4Data.memos ? step4Data.memos : "",
      }),
    };

    if(id){
      dispatch(UpdateClientPayment(formattedPayload));
    }else{
      dispatch(CreateClientPayment(formattedPayload));
    }
    buttonref.current.click();
  };
// Assuming taxname is an array of objects with tax_id, tax_name, and tax_percentage
const formattedTaxOptions = (taxname || []).map((tax) => ({
    ...tax,
    displayLabel: `${tax.tax_name} (${tax.tax_percentage}%)`,
  }));
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextFieldComponent
              type="text"
              name="accounting_name"
              label="Accounting Name"
              value={step4Data.accounting_name}
              onChange={handleInputChange}
              error={errors.accounting_name || ""}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextFieldComponent
              type="text"
              name="tax_id"
              label="Vat Number"
              value={step4Data.tax_id}
              onChange={handleInputChange}
              error={errors.tax_id || ""}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <DropdownComponent
            label="Tax Rate"
            name="tax_rate"
            value={step4Data.tax_rate}
            onChange={handleInputChange}
            options={formattedTaxOptions || []}
            valueKey="tax_id"
            labelKey="displayLabel"
            error={errors.tax_rate || ""}
          />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextFieldComponent
              type="text"
              name="invoice_no_of_days"  // Need to manage from /client api
              label="Number of days (For invoice due date)"
              value={step4Data.invoice_no_of_days}
              onChange={handleInputChange}
              error={errors.invoice_no_of_days || ""} 
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextFieldComponent
              type="text"
              name="memos"
              label="Accounting Notes"
              value={step4Data.memos}
              onChange={handleInputChange}
              error={errors.memos || ""}
              multiline
              rows={8}
              fullWidth
              isNotMandatory={true}
            />
          </Grid>

        </Grid>{" "}
          <Grid2 justifyContent={"space-between"} alignItems={"center"} sx={{mt: 3}} container xs={12}>
            <Typography variant="body2"><span style={{ fontWeight: "bold" }}    >Payment terms :</span> (e.g. all invoices are paid 28 days after date of issue)
            </Typography>
            <Btn ref={buttonref} type="submit">
              Save & Next
            </Btn>
          </Grid2>
      </form>
    </>
  );
};

export default Step4;
