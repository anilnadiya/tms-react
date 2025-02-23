import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading } from "../../Slice/loading/loadingSlice";
import authApi from "../../authApi";
import { setClientAccount, setClients } from "../../Slice/DashboardModule/DashboardSlice";
import { showSnackbar } from "../../Slice/snackbar/snackbarSlice";

export const ProjectList = createAsyncThunk(
  "project-scoop",
  async ({ page, perPage, tabName, sortColumn, sortOrder, search }, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      // Construct the API URL with all parameters
      const url = `/dashboardProjectsOrderScoopGet/1?page=${page}&perPage=${perPage}&tabName=${tabName}${
        sortColumn ? `&sortColumn=${sortColumn}` : ""
      }${sortOrder ? `&sortOrder=${sortOrder}` : ""}${
        search ? `&search=${encodeURIComponent(search)}` : ""
      }`;
      console.log("API URL:", url); // Debug log to verify URL
      const response = await authApi.get(url);
      if (response?.status === 200) {
        dispatch(setClients({
          data: response?.data?.data, // Adjust based on API response structure
          totalPages: response?.data?.totalPages, // Ensure backend sends this
          currentPage: page,
          tabName:tabName
        }));
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log("Error fetching projects:", error);
      dispatch(setLoading(false)); // Ensure loading is unset on error
    }
  }
);

// Rest of the thunks remain unchanged
export const ClientAccountList = createAsyncThunk(
  "clientlistindirect_show/list",
  async (request, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await authApi.get(`/clientlistindirect_show`);
      if (response?.status === 200) {
        dispatch(setClientAccount(response?.data));
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
);

// ... (Other thunks like CreateClientAccount, UpdateClientAccount, etc., remain the same)