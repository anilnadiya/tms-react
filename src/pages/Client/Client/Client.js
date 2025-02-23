import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClientsList, DeleteClient } from "../../../redux/Thunk/ClientModule/ClientThunk";
import { Typography, Grid } from "@mui/material";
import GenericTable from "../../../Components/Ui_elements/GenericTable";
import { SortAlphabetically } from "../../../Helper/SortAlphbetically";
import Btn from "../../../Components/Ui_elements/Btn";
// import AccountForm from "./AccountForm";
import PopupModal from "../../../Components/Ui_elements/PopupModal";

const Client = () => {
  const { clients } = useSelector((state) => state.root.ClientModule);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openForDelete, setOpenForDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(ClientsList());
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
              onClick={() => navigate(`/viewclient/${clientId}`)}
            >
              {value}
            </Typography>
          );
        },
      },
    },
  ];

  const sortedData = SortAlphabetically(clients || [], "vUserName");

  const data = sortedData?.map((item, index) => ({
    rowNumber: index + 1,
    iClientId: item.iClientId,
    vUserName: item.vUserName,
  }));

  const handleDelete = (id) => {
    setOpenForDelete(true);
    setDeleteId(id);
  };
  const handleEdit = (id) => {
    const Id= id[1];
    navigate(`/client/form/${Id}`);
  };
  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} container justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Client Management</Typography>
          <Btn onClick={() => navigate("/client/form")}>
             Add Account
          </Btn>
        </Grid>
      </Grid>
        <GenericTable
          columns={columns}
          data={data}
          showDelete={true}
          onDelete={handleDelete}
          onEdit={handleEdit}
          displayColumns={3}
          displayRows={data?.length || 5}
          // showAction={false}
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
                  dispatch(DeleteClient({id: deleteId, img: "blank.png"})).then(() =>
                    setOpenForDelete(false)
                  )
                }
              >
                Yes
              </Btn>
              <Btn onClick={() => setOpenForDelete(false)}>Cancel</Btn>
            </Grid>
          }
          title={<Typography variant="h6">Delete Client</Typography>}
        >
          <Typography>
            Are you sure you want to delete the selected type?
          </Typography>
        </PopupModal>
      )}
    </>
  );
};

export default Client;
