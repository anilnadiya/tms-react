import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClientAccountList } from "../../../redux/Thunk/ClientModule/ClientThunk";
import { Typography, Grid, Box } from "@mui/material";
import GenericTable from "../../../Components/Ui_elements/GenericTable";
import { SortAlphabetically } from "../../../Helper/SortAlphbetically";
import Btn from "../../../Components/Ui_elements/Btn";
import AccountForm from "./AccountForm";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const Account = () => {
  const { clientAccount } = useSelector((state) => state.root.ClientModule);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(ClientAccountList());
  }, [dispatch]);

  const columns = [
    { name: "rowNumber", label: "No." },
    { name: "iClientId", label: "ID", options: { display: false } },
    {
      name: "vUserName",
      label: "Account Name",
      options: {
        customBodyRender: (value, tableMeta) => {
          const clientId = data[tableMeta.rowIndex].iClientId;
          return (
            <Typography
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => navigate(`/client/accountdetail/${clientId}`)}
            >
              {value}
            </Typography>
          );
        },
      },
    },
  ];

  const sortedData = SortAlphabetically(clientAccount || [], "vUserName");

  const data = sortedData?.map((item, index) => ({
    rowNumber: index + 1,
    iClientId: item.iClientId,
    vUserName: item.vUserName,
  }));

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} container justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Account Management</Typography>
          <Btn startIcon={open && <KeyboardBackspaceIcon/>} onClick={() => setOpen((prev) => !prev)}>
            {open ? "Back" : "Add Account"}
          </Btn>
        </Grid>
      </Grid>
      {open ? (
        <Box mt={6}>
          <AccountForm closeForm={() => setOpen(false)} data={clientAccount} />
        </Box>
      ) : (
        <GenericTable
          columns={columns}
          data={data}
          showDelete={true}
          displayColumns={2}
          displayRows={10}
          showAction={false}
        />
      )}
    </>
  );
};

export default Account;
