import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ProjectList } from "../../redux/Thunk/DashboardModule/DashboardThunk";
import {
  Box,
  Tabs,
  Tab,
  TextField,
  Paper,
  Grid,
} from "@mui/material";
import debounce from "lodash/debounce";
import GenericTable from "../../Components/Ui_elements/GenericTable";

const ProjectscoopTable = () => {
  const { clients, loading } = useSelector(
    (state) => state.root.DashboardModule
  );
  console.log('clients', clients);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [activeTab, setActiveTab] = useState("tab-due-today");
  const [order, setOrder] = useState({ column: "orderNumber", dir: "asc" });
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
      console.log("Dispatching ProjectList with payload:", payload);
      dispatch(ProjectList(payload));
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
    { name: "orderNumber", label: "Project Number" },
    { name: "clientName", label: "Customer" },
    { name: "languages", label: "Languages" },
    { name: "deadline", label: "Deadline" },
    { name: "pm_fullName", label: "Project Manager" },
    { name: "qa_fullName", label: "QA Specialist" },
    { name: "linguist", label: "Linguist" },
    {
      name: "comment",
      label: "Comment",
      renderCell: (params) => (
        <i
          style={{ color: params.commentColor }}
          className={`fa fa-commenting-o fa-2x cmtclr${params.key}`}
        ></i>
      ),
    },
    { name: "scoopStatus", label: "Status" },
    { name: "attached_workflow", label: "Job Type" },
    { name: "job_d_date", label: "Job DL" },
    { name: "project_volume", label: "Project Volume" },
    { name: "total_price", label: "Price" },
    { name: "po_number", label: "PO Number" },
    { name: "projectNumber", label: "Project Name" },
  ];

  // Data mapping
  const data = clients?.data?.map((item, index) => ({
    id: item.itemId,
    key: item.itemId, // Used in renderCell for comment
    rowNumber: index + 1 + page * perPage,
    orderNumber: item.orderNumber || "-",
    clientName: item.contactName || "-",
    languages: item.itemsSourceLang && item.itemsTargetLang
      ? `${item.itemsSourceLang.sourceLang} → ${item.itemsTargetLang.sourceLang}`
      : "-",
    deadline: item.itemDuedate || "-",
    pm_fullName: item.pm_fullName || "-",
    qa_fullName: item.qa_fullName || "-",
    linguist: item.jobLinguist?.map((l) => l.vUserName).join(", ") || "-",
    commentColor: item.comment, // For renderCell
    scoopStatus: item.itemStatus || "-",
    attached_workflow: item.attached_workflow || "-",
    job_d_date: item.linguistDueDate?.map((d) => d.job_d_date).join(", ") || "-",
    project_volume: item.project_volume || "-",
    total_price: item.totalAmount && item.price_currency
      ? `${item.totalAmount} ${item.price_currency}`
      : "-",
    po_number: item.itemPonumber || "-",
    projectNumber: item.scoopName || "-",
  })) || [];

  // Options for GenericTable
  const optionsProps = {
    serverSide: true,
    count: clients?.totalPages * perPage || 0,
    page,
    rowsPerPage: perPage,
    rowsPerPageOptions: [10, 20, 50],
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
          count={clients?.totalPages * perPage || 0}
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

export default ProjectscoopTable;