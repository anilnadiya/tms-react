import { createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../../authApi";
import {
  setContactExternalResource,
  setExternalResource,
  setProfileNumber,
  setPropertyExternalResource,
  setResourcePositionList,
  setResourceStatusList,
  setSingleExternalResource,
  setTreeMenueList,
} from "../../Slice/externalResourceSlice";
import { showSnackbar } from "../../Slice/snackbar/snackbarSlice";

export const getExternalResourceList = createAsyncThunk(
  "getExternalResourceList/list",
  async (request, { dispatch }) => {
    try {
      const response = await authApi.get(`/user/${request.user_id}`);
      if (response?.status === 200) {
        dispatch(setExternalResource(response?.data));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  },
);

export const getSingleExternalResource = createAsyncThunk(
  "getSingleExternalResource",
  async (request, { dispatch }) => {
    try {
      const response = await authApi.get(`/viewExternalget/${request.user_id}`);
      if (response?.status === 200) {
        dispatch(setSingleExternalResource(response?.data));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  },
);
export const getContactExternalResource = createAsyncThunk(
  "contactExternalget",
  async (request, { dispatch }) => {
    try {
      const response = await authApi.get(`/contactExternalget/${request.user_id}`);
      if (response?.status === 200) {
        dispatch(setContactExternalResource(response?.data));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  },
);
export const getPropertyExternalResource = createAsyncThunk(
  "getUserProperty",
  async (request, { dispatch }) => {
    try {
      const response = await authApi.get(`/getUserProperty/${request.user_id}/1`);
      if (response?.status === 200) {
        dispatch(setPropertyExternalResource(response?.data));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  },
);

export const activationRemider = createAsyncThunk(
  "activationRemider",
  async (request, { dispatch }) => {
    try {
      const response = await authApi.post(`/sendAcountActivationlink`, request);
      if (response?.status === 200) {
        dispatch(
          showSnackbar({
            message: "Remider activate successfull",
            type: "info",
          }),
        );
      }
    } catch (error) {
      console.log("error: ", error);
    }
  },
);

export const getProfileNumber = createAsyncThunk(
  "getProfileNumber",
  async (request, { dispatch }) => {
    try {
      const response = await authApi.get(`/userProfileNumber/${request.id}`);
      if (response?.status === 200) {
        dispatch(setProfileNumber(response?.data));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  },
);
export const getResourceStatusOptions = createAsyncThunk(
  "getResourceStatusOption",
  async (_, { dispatch }) => {
    try {
      const response = await authApi.get(`/userstatusactive`);
      if (response?.status === 200) {
        const options = response?.data?.map((item) => {
          return { value: item?.status_id, label: item?.status_name };
        });
        dispatch(setResourceStatusList(options));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  },
);

// getTreeMenu
export const getTreeMenueOptions = createAsyncThunk(
  "getTreeMenueOptions",
  async (_, { dispatch }) => {
    try {
      const response = await authApi.get(`/getTreeMenu`);
      if (response?.status === 200) {
        const options = Object.values(response?.data).map((item) => ({
          value: item?.id,
          label: item?.name,
        }));

        dispatch(setTreeMenueList(options));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  },
);

export const getResourcePosition = createAsyncThunk(
  "getResourcePosition",
  async (request, { dispatch }) => {
    try {
      const response = await authApi.get(`/select2GetAll/${request?.id}`);
      if (response?.status === 200) {
        const options = response?.data?.map((item) => {
          return { value: item?.position_id, label: item?.position_name };
        });
        dispatch(setResourcePositionList(options));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  },
);

export const SaveUserProfileExternal = createAsyncThunk(
  "saveuserprofileExternal",
  async (request, { dispatch }) => {
    try {
      const response = await authApi.post(`/saveuserprofileExternal`, request);
      if (response?.status === 200) {
        dispatch(
          showSnackbar({
            message: "Remider activate successfull",
            type: "info",
          }),
        );
      }
    } catch (error) {
      console.log("error: ", error);
    }
  },
);
