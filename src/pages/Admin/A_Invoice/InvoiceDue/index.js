import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  InvoiceDueList,
  UpdateInvoiceDue,
} from "../../../../redux/Thunk/AdminModule/AdminThunk";
import TextFieldComponent from "../../../../Components/TextFieldComponent";

const InvoiceDue = () => {
  const dispatch = useDispatch();
  const { invoiceDue } = useSelector((state) => state.root.AdminModule);
  const [invoiceData, setInvoiceData] = useState(null);

  useEffect(() => {
    dispatch(InvoiceDueList());
  }, [dispatch]);

  useEffect(() => {
    if (invoiceDue?.length > 0) {
      setInvoiceData(invoiceDue[0]); // Store the full response
    }
  }, [invoiceDue]);

  const handleChange = (e) => {
    setInvoiceData((prev) => ({
      ...prev,
      number_of_days: e.target.value, // Update only number_of_days
    }));
  };

  const handleSave = () => {
    if (!invoiceData) return;

    const updatedData = {
      ...invoiceData,
      modified_date: new Date().toISOString(), // Updating modified_date
    };

    dispatch(UpdateInvoiceDue(updatedData));
  };

  return (
    <>
      <Typography variant="h6" sx={{ py: 2 }}>
        Invoice Due Period
      </Typography>
      <Box className = "boxshadow" sx={{ width: { xs: "100%", sm: "50%", md: "50%" }}}>
        {invoiceData && (
          <>
            <TextFieldComponent

              id="number_of_days"
              name="number_of_days"
              type="number"
              value={invoiceData.number_of_days}
              onChange={handleChange}
              label="Number of Days"
              fullWidth
              isNotMandatory={true}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              sx={{ mt: 2 }}
            >
              Save
            </Button>
          </>
        )}
      </Box>
    </>
  );
};

export default InvoiceDue;
