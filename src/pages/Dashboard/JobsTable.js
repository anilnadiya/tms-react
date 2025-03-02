import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { JobList } from "../../redux/Thunk/DashboardModule/DashboardThunk";
import {
  Box,
  Tabs,
  Tab,
  TextField,
  Grid,
  Paper,
} from "@mui/material";
import debounce from "lodash/debounce";
import GenericTable from "../../Components/Ui_elements/GenericTable";

const JobsTable = () => {
  const { jobsSummury, loading } = useSelector(
    (state) => state.root.DashboardModule
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [activeTab, setActiveTab] = useState("Requested");
  const [order, setOrder] = useState({ column: "jobNumber", dir: "asc" });
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  // Fetch data when page, tab, sort, or search changes
  const fetchData = useCallback(
    (pageNum, rowsPerPage, sortOrder, searchText) => {
      const payload = {
        page: pageNum + 1,
        perPage: rowsPerPage,
        tabName: activeTab,
        sortColumn: sortOrder.column,
        sortOrder: sortOrder.dir,
        search: searchText,
      };
      console.log("Dispatching JobList with payload:", payload);
      dispatch(JobList(payload));
    },
    [dispatch, activeTab]
  );

  useEffect(() => {
    fetchData(page, perPage, order, search);
  }, [page, perPage, order, search, fetchData]);

  // Debounced search logic
  const handleDebouncedSearch = useCallback(
    debounce((value) => {
      setSearch(value);
      setPage(0);
    }, 500),
    []
  );

  useEffect(() => {
    return () => {
      handleDebouncedSearch.cancel();
    };
  }, [handleDebouncedSearch]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchInput(value);
    handleDebouncedSearch(value);
  };

  const handleTabChange = (event, newTab) => {
    setActiveTab(newTab);
    setPage(0);
  };

  // Columns definition for GenericTable
  const columns = [
    { name: "rowNumber", label: "#" },
    { name: "jobNumber", label: "Job Number" },
    { name: "scoopNumber", label: "Scoop Number" },
    { name: "clientName", label: "Client" },
    { name: "languagePair", label: "Language Pair" },
    { name: "jobProjectManager", label: "Project Manager" },
    { name: "jobResource", label: "Resource" },
    { name: "jobType", label: "Job Type" },
    { name: "jobDuedate", label: "Job Due Date" },
    { name: "projectDuedate", label: "Project Due Date" },
    { name: "jobStatus", label: "Status" },
  ];

  // Data mapping
  const data = jobsSummury?.data?.map((item, index) => ({
    id: item.itemId || `${index}`,
    rowNumber: index + 1 + page * perPage,
    jobNumber: item.po_number || "-",
    scoopNumber: item.proj_scoop_no || "-",
    clientName: item.Client || item.contactName || "-",
    languagePair: item.item_source_lang && item.item_target_lang
      ? `${item.item_source_lang.sourceLang} → ${item.item_target_lang.sourceLang}`
      : "-",
    jobProjectManager: item.contact_person || item.pm_fullName || "-",
    jobResource: item.resource || item.jobLinguist?.map((l) => l.vUserName).join(", ") || "-",
    jobType: item.job_type_name || item.attached_workflow || "-",
    jobDuedate: item.due_date && item.due_date !== "0000-00-00 00:00:00"
      ? item.due_date
      : "-",
    projectDuedate: item.item_due_date && item.item_due_date !== "0000-00-00 00:00:00"
      ? item.item_due_date
      : "-",
    jobStatus: item.item_status || item.scoopStatus || "-",
  })) || [];

  // Options for GenericTable
  const optionsProps = {
    serverSide: true,
    count: jobsSummury?.totalPages * perPage || 0,
    page,
    rowsPerPage: perPage,
    rowsPerPageOptions: [10, 25, 50, 100], // Match AngularJS options
    onChangePage: (newPage) => setPage(newPage),
    onChangeRowsPerPage: (newSize) => {
      setPerPage(newSize);
      setPage(0);
    },
    onTableChange: (action, tableState) => {
      if (action === "sort") {
        setOrder((prevOrder) => {
          const newColumn = columns[tableState.activeColumn]?.name;
          if (!newColumn) return prevOrder; // Safety check
          if (prevOrder.column === newColumn) {
            return {
              column: newColumn,
              dir: prevOrder.dir === "asc" ? "desc" : "asc",
            };
          }
          return { column: newColumn, dir: "asc" };
        });
      }
      // Search is handled separately via handleSearchChange
    },
    selectableRows: "none",
    responsive: "standard",
    search: false, // Custom search handled outside
    download: false,
    print: false,
    filter: false,
    viewColumns: false,
    pagination: true,
    sort: true,
  };

  const tabConfig = [
    { label: "Requested", value: "Requested" },
    { label: "In Progress", value: "inProgress" },
    { label: "Due Today", value: "due-today" },
    { label: "Due Tomorrow", value: "tab-tomorrow" },
    { label: "Overdue", value: "tab-overdue" },
  ];

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabConfig.map((tabItem) => (
            <Tab
              key={tabItem.value}
              label={tabItem.label}
              value={tabItem.value}
              sx={{ minWidth: "120px", textTransform: "none" }}
            />
          ))}
        </Tabs>
      </Box>

      <Grid container alignItems="center" justifyContent="flex-end" spacing={2} sx={{ my: 2 }}>
        <Grid item sm={3} xs={12}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchInput}
            onChange={handleSearchChange}
            sx={{ width: "100%", borderRadius: 2 }}
          />
        </Grid>
      </Grid>

      <Paper elevation={3} sx={{ padding: 2 }}>
        <GenericTable
          columns={columns}
          options={optionsProps}
          data={data}
          serverSide={true}
          count={jobsSummury?.totalPages * perPage || 0}
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newSize) => {
            setPerPage(newSize);
            setPage(0);
          }}
          onSearchChange={handleSearchChange}
          order={order}
          setOrder={setOrder}
          displayColumns={columns.length}
          displayRows={10}
          showAction={false}
        />
      </Paper>
    </Box>
  );
};

export default JobsTable;