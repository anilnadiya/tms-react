import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ProjectList } from "../../redux/Thunk/DashboardModule/DashboardThunk";
import {
  Box,
  Tabs,
  Tab,
  TextField,
  Typography,
  Paper,
  Grid,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const DashboardTable = () => {
  const { clients, loading } = useSelector(
    (state) => state.root.DashboardModule
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1); // 1-based page number for API
  const [perPage] = useState(10); // Rows per page
  const [activeTab, setActiveTab] = useState("tab-due-today");
  const [sortModel, setSortModel] = useState([
    { field: "orderNumber", sort: "asc" },
  ]);
  const [search, setSearch] = useState(""); // Search term state

  // Fetch data when page, tab, sort, or search changes
  useEffect(() => {
    const sortColumn = sortModel[0]?.field || "orderNumber";
    const sortOrder = sortModel[0]?.sort || "asc";
    const payload = {
      page,
      perPage,
      tabName: activeTab,
      sortColumn,
      sortOrder,
      search,
    };
    console.log("Dispatching ProjectList with payload:", payload);
    dispatch(ProjectList(payload));
  }, [dispatch, page, perPage, activeTab, sortModel, search]);

  const handleTabChange = (event, newTab) => {
    setActiveTab(newTab);
    setPage(1); // Reset to first page on tab change
  };

  const handleSortModelChange = (newSortModel) => {
    setSortModel(newSortModel); // Update sort model when user sorts
  };

  const handlePageChange = (params) => {
    const newPage = params.page + 1; // Convert 0-based DataGrid page to 1-based API page
    console.log("Page changed to:", newPage);
    setPage(newPage);
  };

  const handleSearchChange = (event) => {
    const newSearch = event.target.value;
    setSearch(newSearch);
    setPage(1); // Reset to first page on search
  };

  const columns = [
    { field: "rowNumber", headerName: "#", width: 70, sortable: false },
    {
      field: "orderNumber",
      headerName: "Project Number",
      width: 150,
      sortable: true,
    },
    { field: "clientName", headerName: "Customer", width: 150, sortable: true },
    { field: "languages", headerName: "Languages", width: 150 },
    { field: "deadline", headerName: "Deadline", width: 130, sortable: true },
    { field: "pm_fullName", headerName: "Project Manager", width: 150 },
    { field: "qa_fullName", headerName: "QA Specialist", width: 150 },
    { field: "linguist", headerName: "Linguist", width: 150 },
    {
      field: "comment",
      headerName: "Comment",
      width: 120,
      renderCell: (params) => (
        <i
          style={{ color: params.row.commentColor }}
          className={`fa fa-commenting-o fa-2x cmtclr${params.row.key}`}
        ></i>
      ),
    },
    { field: "scoopStatus", headerName: "Status", width: 120 },
    { field: "attached_workflow", headerName: "Job Type", width: 120 },
    { field: "job_d_date", headerName: "Job DL", width: 130 },
    { field: "project_volume", headerName: "Project Volume", width: 130 },
    { field: "total_price", headerName: "Price", width: 120 },
    { field: "po_number", headerName: "PO Number", width: 130 },
    { field: "projectNumber", headerName: "Project Name", width: 150 },
  ];

  const rows =
    clients?.data?.map((item, index) => ({
      id: item.itemId, // Unique ID for DataGrid
      key: item.itemId,
      rowNumber: index + 1 + (page - 1) * perPage,
      orderNumber: item.orderNumber,
      clientName: item.contactName,
      languages: `${item.itemsSourceLang.sourceLang} → ${item.itemsTargetLang.sourceLang}`,
      deadline: item.itemDuedate,
      pm_fullName: item.pm_fullName,
      qa_fullName: item.qa_fullName,
      linguist: item.jobLinguist.map((l) => l.vUserName).join(", "),
      commentColor: item.comment,
      scoopStatus: item.itemStatus,
      attached_workflow: item.attached_workflow,
      job_d_date: item.linguistDueDate
        ?.map((d) => d.job_d_date)
        .join(", "),
      project_volume: item.project_volume,
      total_price: `${item.totalAmount} ${item.price_currency}`,
      po_number: item.itemPonumber,
      projectNumber: item.scoopName,
    })) || [];

    const tabConfig = [
        { label: "Due Today", value: "tab-due-today" },
        { label: "Tomorrow", value: "tab-due-tomorrow" },
        { label: "All Projects", value: "tab-all" },
        { label: "My Projects", value: "tab-my-projects" },
        { label: "Overdue", value: "tab-overdue" },
        { label: "Next Week", value: "tab-next-week" },
        { label: "In Progress", value: "tab-in-progress" },
        { label: "Completed", value: "tab-completed" },
        { label: "Pending Review", value: "tab-pending-review" },
        { label: "High Priority", value: "tab-high-priority" },
        { label: "Low Priority", value: "tab-low-priority" },
        { label: "On Hold", value: "tab-on-hold" },
        { label: "Awaiting Client", value: "tab-awaiting-client" },
        { label: "Scheduled", value: "tab-scheduled" },
        { label: "Draft", value: "tab-draft" },
        { label: "Canceled", value: "tab-canceled" },
        { label: "Urgent", value: "tab-urgent" },
        { label: "Team Assigned", value: "tab-team-assigned" },
        { label: "QA Pending", value: "tab-qa-pending" },
        { label: "Final Review", value: "tab-final-review" },
      ];

  return (
    <Box sx={{ padding: 2 }}>
      {/* <Typography variant="h4" gutterBottom>
        Project Dashboard
      </Typography> */}

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

      <Box sx={{ display: "flex", justifyContent: "flex-end", my: 2 }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={search}
          onChange={handleSearchChange}
          sx={{ width: 300, borderRadius: 2 }}
        />
      </Box>
      
      <Paper elevation={3} sx={{ padding: 2 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={perPage}
          rowsPerPageOptions={[perPage]}
          pagination
          page={page - 1}
          onPaginationModelChange={handlePageChange}
          rowCount={clients?.totalPages * perPage || 0}
          paginationMode="server"
          sortingMode="server"
          onSortModelChange={handleSortModelChange}
          sortModel={sortModel}
          loading={loading}
          disableSelectionOnClick
          autoHeight
        />
      </Paper>
    </Box>
  );
};

export default DashboardTable;
