import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loader() {
  return (
    <Box className="loader">
      <CircularProgress color="inherit" size={50} />
      </Box>
  );
}
