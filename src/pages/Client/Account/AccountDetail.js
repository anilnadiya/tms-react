import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {Typography,Grid,Button,Box,Paper,Table,TableBody,TableRow,TableCell,} from "@mui/material";
import AccountForm from "./AccountForm";
import Btn from "../../../Components/Ui_elements/Btn";
import {DeleteClientAccount,GetSingleClientAccount,} from "../../../redux/Thunk/ClientModule/ClientThunk";
import PopupModal from "../../../Components/Ui_elements/PopupModal";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const AccountDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleClientAccount } = useSelector((state) => state.root.ClientModule);
  const [isEditing, setIsEditing] = useState(false);
  const [openForDelete, setOpenForDelete] = useState(false);

  useEffect(() => {
    dispatch(GetSingleClientAccount(id));
  }, [dispatch, id]);

  const handleDelete = () => setOpenForDelete(true);

  const handleConfirmedDelete = () => {
    dispatch(DeleteClientAccount(id));
    navigate("/client/account");
  };

  return (
    <Grid container spacing={3} sx={{ padding: "24px" }}>
      {/* Header Section */}
      <Grid item xs={12}>
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginBottom: "24px" }} >
          <Typography variant="h5" fontWeight="bold">Account Details</Typography>
          <Btn startIcon={<KeyboardBackspaceIcon />} onClick={() => navigate("/client/account")}>Back</Btn>
        </Box>
      </Grid>

      {isEditing ? (
        <Grid item xs={12}>
          <AccountForm initialData={singleClientAccount} closeForm={() => setIsEditing(false)} />
        </Grid>
      ) : (
        <>
          {/* Account Summary Section */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: "24px", borderRadius: "8px" }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {singleClientAccount?.vUserName}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                Customer Account
              </Typography>
              <Box mt={2}>
                <Button variant="contained" color="primary" onClick={() => setIsEditing(true)} sx={{ marginRight: "10px" }} >
                  Edit
                </Button>
                <Button variant="contained" color="error" onClick={handleDelete} >
                  Delete
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Basic Information Section */}
          <Grid item xs={12}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Basic Information
            </Typography>
            <Paper elevation={3} sx={{ padding: "24px", borderRadius: "8px" }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ width: "30%", fontWeight: "bold" }} >
                      Account Name:
                    </TableCell>
                    <TableCell sx={{ width: "70%" }}>
                      {singleClientAccount?.vUserName}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ width: "30%", fontWeight: "bold" }} >
                      Website:
                    </TableCell>
                    <TableCell sx={{ width: "70%" }}>
                      {singleClientAccount?.vWebsite}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ width: "30%", fontWeight: "bold" }} >
                      Notes:
                    </TableCell>
                    <TableCell sx={{ width: "70%" }}>
                      {singleClientAccount?.notes}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          </Grid>

          {/* Delete Confirmation Modal */}
          {openForDelete && (
            <PopupModal
              maxWidth="sm"
              fullWidth
              open={openForDelete}
              handleClose={() => setOpenForDelete(false)}
              actions={
                <Box display="flex" justifyContent="flex-end" gap={2}>
                  <Btn onClick={handleConfirmedDelete}>Yes</Btn>
                  <Btn onClick={() => setOpenForDelete(false)}>Cancel</Btn>
                </Box>
              }
              title={<Typography variant="h6">Delete Account</Typography>}
            >
              <Typography>
                Are you sure you want to delete this account?
              </Typography>
            </PopupModal>
          )}
        </>
      )}
    </Grid>
  );
};

export default AccountDetails;