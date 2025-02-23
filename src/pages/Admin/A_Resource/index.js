import React, { Suspense } from "react";
import { Typography, Box } from "@mui/material";
import Loader from "../../../Components/Ui_elements/Loader";

// Lazy load the components
const ResourcePosition = React.lazy(() => import("./ResourcePosition"));
const ResourceStatus = React.lazy(() => import("./ResourceStatus"));

const AdminResource = () => {
  return (
    <>
      <Typography variant="h5">Resources</Typography>
      <Suspense fallback={<div><Loader/></div>}>
        <Box className = "boxshadow" sx={{pl: 2,pr: 1,mb: 2,mt: 4,}}>
          <ResourceStatus />
        </Box>
      </Suspense>

      <Suspense fallback={<div><Loader/></div>}>
        <Box className = "boxshadow" sx={{pl: 2,pr: 1,mb: 2,mt: 6,}}>
          <ResourcePosition />
        </Box>
      </Suspense>
    </>
  );
};

export default AdminResource;
