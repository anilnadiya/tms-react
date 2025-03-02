import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExternalResourceList } from "../../redux/Thunk/externalResourceThunk";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import DataTables from "../../Components/datatables";

const ExternalResource = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { List } = useSelector((state) => state.root.ExternalResourceReducer);
  const [searchTerm, setSearchTerm] = useState("");

  const columns = [
    {
      name: "vUserName",
      label: "Resources",
      options: {
        customBodyRender: (value, tableMeta) => {
          const clientId = List?.data[tableMeta?.rowIndex]?.iUserId;
          return <Link to={`/viewExternal/${clientId}`}>{value}</Link>;
        },
      },
    },
    { name: "status_name", label: "Status" },
    { name: "vEmailAddress", label: "Email" },
    {
      name: "csv_import",
      label: "Csv Import",
      options: {
        customBodyRender: (value) => (value === 0 ? "-" : "Imported"),
      },
    },
    {
      name: "activation_status",
      label: "Action",
      options: {
        customBodyRender: (value) =>
          value === 0 ? (
            <Typography color="error">Not Activated</Typography>
          ) : (
            <Typography color="success">Activated</Typography>
          ),
        setCellProps: () => ({ style: { width: "120px" } }),
        setCellHeaderProps: () => ({ style: { width: "120px" } }),
        filter: true,
        sort: true,
      },
    },
  ];

  useEffect(() => {
    const request = {
      user_id: 2,
    };
    dispatch(getExternalResourceList(request));
  }, []);

  const filteredData = List?.data?.filter((row) =>
    columns?.some((column) =>
      row[column?.name]
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
            Resource Search
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#3f51b5", color: "white" }}
          >
            Advance Resource Search
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#3f51b5", color: "white" }}
          >
            Import Csv
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

      <DataTables columns={columns} datas={filteredData ? filteredData : []} />
    </Container>
  );
};

export default ExternalResource;
