import React, { useEffect, useState } from "react";
import { Typography, Grid, Box } from "@mui/material";
import DashboardTable from "./dashboardTable";
//import Btn from "../../../Components/Ui_elements/Btn";

const Index = () => {



  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} container justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Dashboard</Typography>
          {/* <Btn onClick={() => navigate("/resources/internal-add")}>
             Add Resource
          </Btn> */}
        </Grid>
      </Grid>
      <div>
        <DashboardTable></DashboardTable>
      </div>
      {/* )} */}
    </>
  );
};

export default Index;
