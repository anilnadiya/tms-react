import React from "react";
import {Grid,TextField,FormControl,FormLabel,Button,} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextFieldComponent from "../../Components/TextFieldComponent";
import DropdownComponent from "../../Components/DropdownComponent";

const FilterForm = ({
  formData,
  handleInputChange,
  handleFilter,
  dropdownClient,
  dropdownExternalUser
}) => {
  const invoiceStatus= ['Open','Approved','Partly Paid','Paid','Complete','Overdue','Cancel'];
  return (
    // <Grid>This is testing</Grid>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth >
            <FormLabel>Due Date From</FormLabel>
            <DatePicker
              name="dueDateFrom"
              value={formData.dueDateFrom}
              onChange={(newValue) =>
                handleInputChange({
                  target: { name: "dueDateFrom", value: newValue },
                })
              }
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <FormLabel>Due Date To</FormLabel>
            <DatePicker
              name="dueDateTo"
              value={formData.dueDateTo}
              onChange={(newValue) =>
                handleInputChange({
                  target: { name: "dueDateTo", value: newValue },
                })
              }
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <DropdownComponent
            label="Company Code"
            name="companyCode"
            value={formData.companyCode}
            onChange={handleInputChange}
            options={Object.values(dropdownClient) || []}
            valueKey="center_id"
            labelKey="abbrivation"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <DropdownComponent
            label="Invoice Status"
            name="invoiceStatus"
            value={formData.invoiceStatus || ""}
            onChange={handleInputChange}
            options={invoiceStatus} // Array-based options
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <DropdownComponent
            label="Select Resource"
            name="resource"
            value={formData.resource}
            onChange={handleInputChange}
            options={Object.values(dropdownExternalUser) || []}
            valueKey="iUserId"
            labelKey="vUserName"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextFieldComponent
            type="text"
            id="invoiceNumber"
            name="invoiceNumber"
            label="Invoice Number"
            value={formData.invoiceNumber}
            onChange={handleInputChange}
            fullWidth
            isNotMandatory={true}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleFilter}>
            Filter
          </Button>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default FilterForm;
