import { combineReducers } from "redux";
import snackbarSlice from "./Slice/snackbar/snackbarSlice";
import AdminSlice from "./Slice/AdminModule/AdminSlice";
import loadingSlice from "./Slice/loading/loadingSlice";
import loginSlice from "./Slice/authSlice/loginSlice";
import ClientSlice from "./Slice/ClientModule/ClientSlice";
import StatementSlice from "./Slice/StatementModule/StatementSlice";
import internalResourceSlice from "./Slice/internalModule/internalResourceSlice";
import ReportSlice from "./Slice/ReportModule/ReportSlice";
import externalResourceSlice from "./Slice/externalResourceSlice";
import DashboardSlice from "./Slice/DashboardModule/DashboardSlice";


const rootReducer = combineReducers({
  authUser: loginSlice,
  snackbar: snackbarSlice,
  AdminModule: AdminSlice,
  ClientModule: ClientSlice,
  StatementModule: StatementSlice,
  loading: loadingSlice,
  InternalResource: internalResourceSlice,
  ReportModule: ReportSlice,
  ExternalResourceReducer: externalResourceSlice,
  DashboardModule: DashboardSlice,


});

export default rootReducer;
