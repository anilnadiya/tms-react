import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clientAccount: [],
  savedlogs: [],
  singleClientAccount: [],
  numberAscending: [],
  clients: {
    data: [],
    totalPages: 1,
    currentPage: 1,
    tabName: "tab-my-projects",
    search: "", // Added search field
  },
  clientStepperData: [],
  client_status: [],
  country: [],
};

const DashboardSlice = createSlice({
  name: "DashboardSlice",
  initialState,
  reducers: {
    setClientAccount: (state, action) => ({
      ...state,
      clientAccount: action.payload,
    }),
    setLogs: (state, action) => ({
      ...state,
      savedlogs: action.payload,
    }),
    setSingleClientAccount: (state, action) => ({
      ...state,
      singleClientAccount: action.payload,
    }),
    setNumber: (state, action) => ({
      ...state,
      numberAscending: action.payload,
    }),
    setClients: (state, action) => ({
      ...state,
      clients: {
        data: action.payload.data,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
        tabName: action.payload.tabName,
        search: action.payload.search || state.clients.search, // Preserve or update search
      },
    }),
    setClientSteppers: (state, action) => ({
      ...state,
      clientStepperData: action.payload,
    }),
    setClientStatus: (state, action) => ({
      ...state,
      client_status: action.payload,
    }),
    setCountries: (state, action) => ({
      ...state,
      country: action.payload,
    }),
  },
});

export const { setClientAccount, setLogs, setSingleClientAccount, setNumber, setClients, setClientSteppers, setClientStatus, setCountries } =
  DashboardSlice.actions;

export default DashboardSlice.reducer;