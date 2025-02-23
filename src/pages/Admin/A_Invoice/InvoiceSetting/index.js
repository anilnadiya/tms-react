import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, FormControl, Select, MenuItem, FormLabel, Chip, Typography, Box } from "@mui/material";
import {
  InvoiceSettingList,
  GetSingleInvoiceSetting,
  UpdateInvoiceSetting,
  DropdownClientCenter,
} from "../../../../redux/Thunk/AdminModule/AdminThunk";
import GenericTable from "../../../../Components/Ui_elements/GenericTable";
import TextFieldComponent from "../../../../Components/TextFieldComponent";
import Btn from "../../../../Components/Ui_elements/Btn";

const InvoiceSetting = () => {
  const dispatch = useDispatch();
  const { invoiceSetting, singleInvoiceSetting, dropdownClient } = useSelector(
    (state) => state.root.AdminModule
  );

  const [formData, setFormData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [errors, setErrors] = useState({}); // State to track validation errors

  useEffect(() => {
    dispatch(InvoiceSettingList());
    dispatch(DropdownClientCenter());
  }, [dispatch]);

  useEffect(() => {
    if (singleInvoiceSetting && isEdit) {
      setFormData({
        id: singleInvoiceSetting.id,
        company_name: singleInvoiceSetting.company_name,
        city: singleInvoiceSetting.city,
        postcode: singleInvoiceSetting.postcode,
        country: singleInvoiceSetting.country,
        vat_number: singleInvoiceSetting.vat_number,
        address1: singleInvoiceSetting.address1,
        work_email: singleInvoiceSetting.work_email,
        web_address: singleInvoiceSetting.web_address,
        copyright_text: singleInvoiceSetting.copyright_text,
        company_short_code: singleInvoiceSetting.company_short_code,
        description: singleInvoiceSetting.description,
        invoice_receive_email: singleInvoiceSetting.invoice_receive_email,
        branch_center_id: singleInvoiceSetting.branch_center_id
          ? singleInvoiceSetting.branch_center_id.split(",").map((id) => Number(id.trim()))
          : [],
      });
    }
  }, [singleInvoiceSetting, isEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear the error for the field when it changes
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleMultiSelectChange = (event) => {
    const { value } = event.target;
    setFormData((prev) => ({
      ...prev,
      branch_center_id: value,
    }));
    // Clear the error for the field when it changes
    setErrors((prev) => ({ ...prev, branch_center_id: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      { field: "company_name", label: "Company Name" },
      { field: "city", label: "City" },
      { field: "postcode", label: "Postal Code" },
      { field: "country", label: "Country" },
      { field: "vat_number", label: "VAT Number" },
      { field: "address1", label: "Address" },
      { field: "work_email", label: "Work Email" },
      { field: "web_address", label: "Web Address" },
      { field: "copyright_text", label: "Copyright Text" },
      { field: "company_short_code", label: "Short Code" },
      { field: "invoice_receive_email", label: "Invoice Receive Email" },
      { field: "branch_center_id", label: "Branch Centers" },
    ];
  
    requiredFields.forEach(({ field, label }) => {
      if (!formData?.[field] || (Array.isArray(formData[field]) && formData[field].length === 0)) {
        newErrors[field] = `${label} is required`; // Custom error message
      }
    });
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Stop submission if validation fails

    if (isEdit && formData) {
      const updatedData = {
        ...formData,
        branch_center_id: formData.branch_center_id.join(","),
      };
      dispatch(UpdateInvoiceSetting(updatedData));
      setIsEdit(false);
      setFormData(null);
    }
  };

  return (
    <>
    <Typography variant="h6" sx={{ py: 2 }}>
    Invoice & PO Setting
    </Typography>
   
    {isEdit && (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextFieldComponent
                type="text"
                id="company_name"
                name="company_name"
                label="Company Name"
                value={formData?.company_name || ""}
                onChange={handleInputChange}
                fullWidth
                error={errors.company_name}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextFieldComponent
                type="text"
                id="city"
                name="city"
                label="City"
                value={formData?.city || ""}
                onChange={handleInputChange}
                fullWidth
                error={errors.city}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextFieldComponent
                type="text"
                id="postcode"
                name="postcode"
                label="Postal Code"
                value={formData?.postcode || ""}
                onChange={handleInputChange}
                fullWidth
                error={errors.postcode}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextFieldComponent
                type="text"
                id="country"
                name="country"
                label="Country"
                value={formData?.country || ""}
                onChange={handleInputChange}
                fullWidth
                error={errors.country || ""}              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextFieldComponent
                type="text"
                id="vat_number"
                name="vat_number"
                label="VAT Number"
                value={formData?.vat_number || ""}
                onChange={handleInputChange}
                fullWidth
                error={errors.vat_number}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextFieldComponent
                type="text"
                id="address1"
                name="address1"
                label="Address"
                value={formData?.address1 || ""}
                onChange={handleInputChange}
                fullWidth
                error={errors.address1}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextFieldComponent
                type="text"
                id="work_email"
                name="work_email"
                label="Work Email"
                value={formData?.work_email || ""}
                onChange={handleInputChange}
                fullWidth
                error={errors.work_email}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextFieldComponent
                type="text"
                id="web_address"
                name="web_address"
                label="Web Address"
                value={formData?.web_address || ""}
                onChange={handleInputChange}
                fullWidth
                error={errors.web_address}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextFieldComponent
                type="text"
                id="copyright_text"
                name="copyright_text"
                label="Copyright Text"
                value={formData?.copyright_text || ""}
                onChange={handleInputChange}
                fullWidth
                error={errors.copyright_text}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextFieldComponent
                type="text"
                id="company_short_code"
                name="company_short_code"
                label="Short Code"
                value={formData?.company_short_code || ""}
                onChange={handleInputChange}
                fullWidth
                error={errors.company_short_code}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextFieldComponent
                type="text"
                id="description"
                name="description"
                label="Description"
                value={formData?.description || ""}
                onChange={handleInputChange}
                fullWidth
                isNotMandatory={true}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextFieldComponent
                type="text"
                id="invoice_receive_email"
                name="invoice_receive_email"
                label="Invoice Receive Email (Linguist)"
                value={formData?.invoice_receive_email || ""}
                onChange={handleInputChange}
                fullWidth
                error={errors.invoice_receive_email}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth error={errors.branch_center_id}>
                <FormLabel>Branch Centers</FormLabel>
                <Select
                  multiple
                  id="branch_center_id"
                  name="branch_center_id"
                  value={formData?.branch_center_id || []}
                  onChange={handleMultiSelectChange}
                  renderValue={(selected) => (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={
                            dropdownClient.find((c) => c.center_id == value)?.name || value
                          }
                        />
                      ))}
                    </div>
                  )}
                >
                  {dropdownClient?.map((client) => (
                    <MenuItem key={client.center_id} value={client.center_id}>
                      {client.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Btn sx={{ mr: 1 }} type="submit">
                Update
              </Btn>
              <Btn onClick={() => setIsEdit(false)}>Cancel</Btn>
            </Grid>
          </Grid>
        </form>
      )}
     <Box className = "boxshadow" sx={{mt:isEdit ? 3 : 0 }}>
      <GenericTable
        columns={[
          { name: "rowNumber", label: "No." },
          { name: "id", label: "ID", options: { display: false } },
          { name: "company_name", label: "Company Name" },
          { name: "country", label: "Country" },
          { name: "vat_number", label: "VAT Number" },
          { name: "work_email", label: "Work Email" },
        ]}
        data={invoiceSetting?.map((item, index) => ({
          rowNumber: index + 1,
          id: item.id,
          company_name: item.company_name,
          country: item.country,
          vat_number: item.vat_number,
          work_email: item.work_email,
        }))}
        onEdit={(rowData) => {
          dispatch(GetSingleInvoiceSetting(rowData[1]));
          setIsEdit(true);
        }}
        showDelete={false}
        displayColumns={6}
        displayRows={10}
      />
      </Box>
    </>
  );
};

export default InvoiceSetting;