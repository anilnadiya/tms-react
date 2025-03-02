import React, { useState } from "react";
import { Typography, Grid, Box, Paper, IconButton, Collapse } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DashboardTable from "./ProjectscoopTable";
import OverviewWidgets from "./OverviewWidgets"; // Renamed for clarity, assuming it’s the same as DashboardWidget
import JobsTable from "./JobsTable";
//import "@fortawesome/fontawesome-free/css/all.min.css"; // For Font Awesome icons if needed

const Index = () => {
  const [isWidgetsSectionOpen, setIsWidgetsSectionOpen] = useState(false);
  const [isJobsSectionOpen, setIsJobsSectionOpen] = useState(false);

  // Data for the widgets (expanded to 5 to match your earlier description)
  const widgets = [
    { title: "Upcoming Deliveries", imgSrc: "./img/delivery.svg", count: 33 },
    { title: "Due Jobs", imgSrc: "./img/work-job.svg", count: 3 },
    { title: "Birthday/Holidays", imgSrc: "./img/calendar.png", count: 0 },
    { title: "Absent Linguists", imgSrc: "./img/absent-linguists.png", count: 0 },
    { title: "National Holidays", imgSrc: "./img/holiday.svg", count: 84 },
  ];

  const toggleWidgetsSection = () => {
    setIsWidgetsSectionOpen(!isWidgetsSectionOpen);
  };

  const toggleJobsSection = () => {
    setIsJobsSectionOpen(!isJobsSectionOpen);
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ color: "#3f51b5", fontWeight: 600, mb: 2 }}>
          Dashboard
        </Typography>
      </Box>

      {/* Dashboard Table Section */}
      <Paper
        elevation={2}
        sx={{
          borderRadius: "8px",
          mb: 3,
          backgroundColor: "#ffffff",
          overflow: "hidden",
        }}
      >
        <DashboardTable />
      </Paper>

      {/* Collapsible Overview Section */}
      <Paper
        elevation={2}
        sx={{
          borderRadius: "8px",
          mb: 3,
          backgroundColor: "#ffffff",
          overflow: "hidden",
          cursor: "pointer",
        }}
        onClick={toggleWidgetsSection}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h4" sx={{ color: "#3f51b5", fontWeight: 600 }}>
            Overview
          </Typography>
          <IconButton>
            <ArrowForwardIcon sx={{ color: "#3f51b5" }} />
          </IconButton>
        </Box>
      </Paper>

      {/* Widgets Section (Only shown if open) */}
      <Collapse in={isWidgetsSectionOpen} timeout="auto" unmountOnExit>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {widgets.map((widget, index) => (
            <Grid item xs={12} sm={2.4} key={index}> {/* Adjusted to 5 columns on desktop */}
              <OverviewWidgets
                title={widget.title}
                imgSrc={widget.imgSrc}
                count={widget.count}
              />
            </Grid>
          ))}
        </Grid>
      </Collapse>

      {/* Collapsible Jobs Section */}
      <Paper
        elevation={2}
        sx={{
          borderRadius: "8px",
          mb: 3,
          backgroundColor: "#ffffff",
          overflow: "hidden",
          cursor: "pointer",
        }}
        onClick={toggleJobsSection}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h4" sx={{ color: "#3f51b5", fontWeight: 600 }}>
            Jobs
          </Typography>
          <IconButton>
            <ArrowForwardIcon sx={{ color: "#3f51b5" }} />
          </IconButton>
        </Box>
      </Paper>

      {/* Jobs Table (Only shown if open) */}
      <Collapse in={isJobsSectionOpen} timeout="auto" unmountOnExit>
        <Paper
          elevation={2}
          sx={{
            borderRadius: "8px",
            backgroundColor: "#ffffff",
            overflow: "hidden",
          }}
        >
          <JobsTable />
        </Paper>
      </Collapse>
    </Box>
  );
};

export default Index;