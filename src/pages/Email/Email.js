import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EmailList } from "../../redux/Thunk/AdminModule/AdminThunk";
import { SortAlphabetically } from "../../Helper/SortAlphbetically";
import { Typography } from "@mui/material";
import GenericTable from "../../Components/Ui_elements/GenericTable";

const Email = () => {
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.root.AdminModule);

  useEffect(() => {
    dispatch(EmailList());
  }, [dispatch]);

  const columns = [
    {name: "rowNumber",label: "No.",options: {sort: true,},},
    { name: "ContactAlt", label: "Name " },
    { name: "Subject", label: "Subject " },
    { name: "Status", label: "Status" },
    { name: "ArrivedAt", label: "Date" },
  ];
  // Convert the email object into an array
  const emailArray = Object.values(email || {});
  const sortedData = SortAlphabetically(emailArray || [], "ContactAlt");

  const data = sortedData?.map((item, index) => ({
    rowNumber: index + 1,
    ContactAlt: item.ContactAlt,
    Subject: item.Subject || "",
    Status: item.Status || "",
    ArrivedAt: new Date(item.ArrivedAt).toLocaleString(),
  }));

  return (
    <>
      <Typography variant="h6" sx={{ py: 2 }}>
        Emails
      </Typography>
      <GenericTable
        columns={columns}
        data={data}
        showDelete={true}
        displayColumns={5}
        displayRows={10}
        showAction={false}
      />
    </>
  );
};

export default Email;
