import React from "react";
import themes from "./themes";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { useSelector } from "react-redux";
import "./assets/scss/styles.scss";
import PageRoute from "./Components/Routers/PageRoute";
import SnackbarCompo from "./Components/Ui_elements/Snackbar";

function App() {
  const customization = useSelector((state) => state.root.customization);

  return (
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <ThemeProvider theme={themes(customization)}>
        <SnackbarCompo/>
       <PageRoute/>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
