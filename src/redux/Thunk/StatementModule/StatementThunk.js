import { createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../../authApi";
import { showSnackbar } from "../../Slice/snackbar/snackbarSlice";
import { setClientStatement, setExternalUser, setLinguistStatement } from "../../Slice/StatementModule/StatementSlice";

export const CreateFilteredClientStatement = createAsyncThunk(
    "filterClientStatement/create",
    async (request, { dispatch }) => {
      try {
        const response = await authApi.post(`/filterClientStatement`, request);
        if (response?.status === 200) {
          dispatch(setClientStatement(response?.data));
          dispatch(
            showSnackbar({
              message: response?.data?.msg || "Filtered Successfully",
              type: "success",
            })
          );
        }
      } catch (error) {
        dispatch(
          showSnackbar({
            message: error?.response?.data?.msg,
            type: "error",
          })
        );
        console.log("Error: ", error);
      }
    }
  );


  export const DropdownExternalUserList = createAsyncThunk(
    "userExternalGet/list",
    async (request, { dispatch }) => {
      try {
        const response = await authApi.get(`/userExternalGet/2`);
        if (response?.status === 200) {
          dispatch(setExternalUser(response?.data));
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
  );


  export const CreateFilteredLinguistStatement = createAsyncThunk(
    "filterStatement/create",
    async (request, { dispatch }) => {
      try {
        const response = await authApi.post(`/filterStatement`, request);
        if (response?.status === 200) {
          dispatch(setLinguistStatement(response?.data));
          dispatch(
            showSnackbar({
              message: response?.data?.msg || "Filtered Successfully",
              type: "success",
            })
          );
        }
      } catch (error) {
        dispatch(
          showSnackbar({
            message: error?.response?.data?.msg,
            type: "error",
          })
        );
        console.log("Error: ", error);
      }
    }
  );