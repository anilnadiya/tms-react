import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInternalResourceList } from "../../redux/Thunk/internalResourceThunk/internalResourceThunk";
import DynamicTable from "../../Components/table/TableComponent";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const InternalResource = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.root.authUser);
  const { List } = useSelector((state) => state.root.InternalResource);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const columns = [
    {
      field: "vUserName",
      headerName: "Employee",
      format: (value, row) => (
        <Link to={`/viewinternal/${row?.iUserId}`}>{value}</Link>
      ),
    },
    { field: "position_name", headerName: "Position" },
    { field: "vEmailAddress", headerName: "Email" },
    {
      field: "activation_status",
      headerName: "Profile Activate",
      format: (value) => (value === 0 ? "Inactive" : "Active"),
      render: (value) => ({
        color: value === 0 ? "red" : "green",
        fontWeight: "bold",
      }),
    },
  ];

  useEffect(() => {
    const request = {
      user_id: user?.iUserId,
    };
    dispatch(getInternalResourceList(request));
  }, []);

  const filteredData = List?.data?.filter((row) =>
    columns.some((column) =>
      row[column.field]
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    ),
  );

  return (
    <Container
      sx={{
        padding: "16px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Resource Management</Typography>
        <Box display={"flex"} gap={2}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#3f51b5", color: "white" }}
            onClick={() => {
              navigate("/manage/internal");
            }}
          >
            {" "}
            Add Resource
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#3f51b5", color: "white" }}
          >
            {" "}
            Resource Management
          </Button>
        </Box>
      </Box>

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <TextField
          variant="outlined"
          size="small"
          value={searchTerm}
          margin="normal"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      <DynamicTable
        columns={columns}
        data={filteredData || []}
        page={page}
        setPage={setPage}
      />
    </Container>
  );
};

export default InternalResource;
