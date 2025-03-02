import React, { useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Avatar,
  Tabs,
  Tab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import {
  Email,
  Edit,
  Folder,
  Delete,
  CheckCircle,
  Notifications,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  activationRemider,
  getSingleInternalResource,
} from "../../redux/Thunk/internalResourceThunk/internalResourceThunk";

const Viewinternal = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = React.useState(0);
  const { internalResource } = useSelector(
    (state) => state.root.InternalResource,
  );

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleActivationRemider = (resource) => {
    dispatch(activationRemider(resource));
  };

  const handleEmail = () => {
    // EmailForm
  };

  useEffect(() => {
    const request = {
      user_id: params?.id,
    };
    dispatch(getSingleInternalResource(request));
  }, [params?.id]);

  return (
    <Container sx={{ bgcolor: "#f4f0ff", p: 3, borderRadius: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: "#e5e1fa",
          p: 3,
          borderRadius: 2,
        }}
      >
        <Avatar sx={{ width: 80, height: 80, mr: 2 }} />
        <Box>
          <Typography variant="h5" fontWeight="bold">
            {internalResource?.vUserName || "N/A"}
          </Typography>
          <Typography variant="subtitle1">
            I am a {internalResource?.vResourcePositionName || ""}
          </Typography>
        </Box>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Email />}
          onClick={handleEmail}
        >
          Email
        </Button>
        <Button variant="contained" color="secondary" startIcon={<Edit />}>
          Edit
        </Button>
        <Button variant="contained" color="info" startIcon={<Folder />}>
          File Manager
        </Button>
        <Button variant="contained" color="error" startIcon={<Delete />}>
          Delete
        </Button>
        <Button variant="contained" color="success" startIcon={<CheckCircle />}>
          Set As Active
        </Button>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Notifications />}
          onClick={() => handleActivationRemider(internalResource)}
        >
          Activation Reminder
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            navigate(-1);
          }}
          sx={{ ml: 1 }}
        >
          Back
        </Button>
      </Box>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        sx={{ mt: 2, borderBottom: 1, borderColor: "divider" }}
      >
        <Tab
          label="Basic Information"
          sx={{
            color: "purple",
            "&.Mui-selected": { color: "black" }, // Active tab color
          }}
        />
        <Tab
          label="Contact Information"
          sx={{
            color: "purple",
            "&.Mui-selected": { color: "black" },
          }}
        />
        <Tab
          label="Absent List"
          sx={{
            color: "purple",
            "&.Mui-selected": { color: "black" },
          }}
        />
      </Tabs>

      {tabValue === 0 && (
        <Paper sx={{ mt: 2, p: 2 }}>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                  <TableCell>{internalResource.vUserName || "N/A"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Position</TableCell>
                  <TableCell>
                    {internalResource.vResourcePositionName || "N/A"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Gender</TableCell>
                  <TableCell>
                    {internalResource.iGender === 1 ? "Male" : "Female"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Date of Birth
                  </TableCell>
                  <TableCell>
                    {internalResource.dtBirthDate
                      ? `${new Date(
                          internalResource.dtBirthDate,
                        ).toLocaleDateString()} (Age: ${
                          new Date().getFullYear() -
                          new Date(internalResource.dtBirthDate).getFullYear()
                        })`
                      : "N/A"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      <Typography variant="body2" align="left" sx={{ mt: 4, color: "gray" }}>
        &copy; 2015 Copyright.
      </Typography>
    </Container>
  );
};

export default Viewinternal;
