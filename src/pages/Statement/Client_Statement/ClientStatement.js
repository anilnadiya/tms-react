import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DropdownClientCenter } from "../../../redux/Thunk/AdminModule/AdminThunk";
import Btn from "../../../Components/Ui_elements/Btn";
import { Box, Typography, Grid, Grid2 } from "@mui/material";
import FilterForm from "../FilterForm";
import {DropdownExternalUserList,CreateFilteredClientStatement,
} from "../../../redux/Thunk/StatementModule/StatementThunk";
import GenericTable from "../../../Components/Ui_elements/GenericTable";
import {  SortAlphabetically } from "../../../Helper/SortAlphbetically";
import dayjs from "dayjs";
import { setClientStatement } from "../../../redux/Slice/StatementModule/StatementSlice";
import { convertDotToComma } from "../../../Helper/ConvertDotToComma";
import { showSnackbar } from "../../../redux/Slice/snackbar/snackbarSlice";

const ClientStatement = () => {
  const dispatch = useDispatch();

  // Get dropdown data and filtered client statement from Redux
  const { dropdownClient } = useSelector((state) => state.root.AdminModule);
  const { dropdownExternalUser, clientStatement } = useSelector((state) => state.root.StatementModule);    
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    comapanyCode: "",
    dueDateFrom: null,
    dueDateTo: null,
    invoiceNumber: "",
    invoiceStatus: "",
    resource: "",
  });

  useEffect(() => {
    dispatch(DropdownClientCenter());
    dispatch(DropdownExternalUserList());
  }, [dispatch]);

  useEffect(() => {
    const isEmpty = Object.values(formData).every((val) => val === "" || val === null);
    if (isEmpty) {
      dispatch(setClientStatement([])); // Reset the state if formData is empty
    }
  }, [formData, dispatch]);

  // Handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle filter action
  const handleFilter = () => {
    const isAllFieldsEmpty = Object.values(formData).every(
      (value) => value === null || value === "" || value === undefined
    );
  
     // If all fields are empty, show an alert and return early
  if (isAllFieldsEmpty) {
    dispatch(
      showSnackbar({
        message: "Please select at least one filter",
        type: "info",
      })
    );
    return;
  }

  // Check if dueDateFrom is selected but dueDateTo is missing
  if ((formData.dueDateFrom && !formData.dueDateTo) || (!formData.dueDateFrom && formData.dueDateTo)) {
    dispatch(
      showSnackbar({
        message: "Please select both Due Date From and Due Date To",
        type: "info",
      })
    );
    return;
  }
    // Format dates to 'YYYY-MM-DD'
    const formattedFormData = {
      ...formData,
      dueDateFrom: formData.dueDateFrom
        ? dayjs(formData.dueDateFrom).format("YYYY-MM-DD")
        : null,
      dueDateTo: formData.dueDateTo
        ? dayjs(formData.dueDateTo).format("YYYY-MM-DD")
        : null,
    };
  
    // Remove empty fields from the payload
    const filteredPayload = Object.fromEntries(
      Object.entries(formattedFormData).filter(([_, value]) => value)
    );
  
    // Dispatch the action with only selected filters
    if(!isAllFieldsEmpty){
      dispatch(CreateFilteredClientStatement(filteredPayload));
    }
  };
  

  const columns = [
    {
      name: "rowNumber",
      label: "No.",
      options: {
        sort: true,
      },
    },
    {name: "InvoiceNo",label: "Invoice No."},
    { name: "companyName", label: "Company Name" },
    { name: "created_date", label: "Invoice Date" },
    { name: "Amount", label: "Total Amount" },
    { name: "client_currency", label: "Currency" },
  ];

  const sortedData = SortAlphabetically(clientStatement || [], "companyName");

  const data = sortedData?.map((item, index) => ({
    rowNumber: index + 1,
    InvoiceNo: item?.InvoiceNo,
    companyName: item?.companyName,
    created_date: dayjs(item?.created_date).format("DD.MM.YYYY"),
    Amount: convertDotToComma(item?.Amount),
    client_currency: item?.client_currency,
  }));
  const totalAmount = clientStatement?.reduce((sum, item) => {
    return sum + parseFloat(item.Amount/item.currency_rate || 0);
  }, 0);
  const totalPaidAmount = clientStatement?.reduce((sum, item) => {
    return sum + parseFloat(item.paid_amount || 0);
  }, 0);

  const totalPendingAmount = totalAmount - totalPaidAmount;
  const formatedTotalAmount = totalAmount.toFixed(2);
  const formatedTotalPendingAmount = totalPendingAmount.toFixed(2);
  const handleReset = () => {
    setFormData({
      comapanyCode: "",
      dueDateFrom: null,
      dueDateTo: null,
      invoiceNumber: "",
      invoiceStatus: "",
      resource: "",
    });
  }
  return (
    <>
      <Typography variant="h5" fontWeight="bold">
        Client Statement
      </Typography>

      <Grid item xs={12} sx={{ padding: "24px",mt:2 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ marginBottom: "24px" }}
        >
          <Grid2 container spacing={4}>
            <Grid2 item>
              <Typography variant="h6">Total Amount</Typography>
              <Typography variant="h5">
              € {convertDotToComma(formatedTotalAmount)}
              </Typography>
            </Grid2>
            <Grid2 item>
              <Typography variant="h6">Total Paid Amount</Typography>
              <Typography variant="h5">
              € {convertDotToComma(formatedTotalPendingAmount)}
              </Typography>
            </Grid2>
          </Grid2>
          <Grid2 >
          {open && <Btn onClick={handleReset}>Reset</Btn>}
          <Btn sx={{ ml: 2 }} onClick={() => setOpen((prev) => !prev)}>Filter</Btn>
          </Grid2>
        </Box>
      </Grid>

      {open && (
        <Box className = "boxshadow">
          <FilterForm
            dropdownClient={dropdownClient}
            dropdownExternalUser={dropdownExternalUser?.data}
            formData={formData}
            handleInputChange={handleInputChange}
            handleFilter={handleFilter}
          />
        </Box>
      )}

      <GenericTable
        columns={columns}
        data={data}
        showDelete={true}
        displayColumns={6}
        displayRows={10}
        showAction={false}
      />
    </>
  );
};

export default ClientStatement;
