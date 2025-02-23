import { createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../../authApi";
import {
  getSingleChildPrice,
  getSingleInvoiceSetting,
  setAbbreviation,
  setBankingInfo,
  setBusinessUnit,
  setChildPrice,
  setClientStatus,
  setCurrency,
  setCurrencyCode,
  setDateFormate,
  setDecimalSeparator,
  setDropdownClient,
  setDropdownMasterPrice,
  setDropdownMasterUnits,
  setEmail,
  setEmailTemplate,
  setInvoiceDue,
  setInvoiceSetting,
  setJobs,
  setJobStatus,
  setLanguage,
  setLanguageTranslate,
  setMasterPrice,
  setMemoQLanguage,
  setProjectTypes,
  setProperty,
  setPropertyValue,
  setResourcePosition,
  setResourceStatus,
  setRoundingPrice,
  setScoopStatus,
  setSpecilizationList,
  setTaxation,
} from "../../Slice/AdminModule/AdminSlice";
import { showSnackbar } from "../../Slice/snackbar/snackbarSlice";
import { setLoading } from "../../Slice/loading/loadingSlice";

// ----------- Specialization module ---------------

export const CreateSpecialization = createAsyncThunk(
  "specializedSave",
  async (request, { dispatch }) => {
    try {
      const response = await authApi.post(`/specializedSave`, request);
      console.log("responsesave: ", response);

      // Optional: Handle response if needed
      if (response?.status === 200) {
        dispatch(SpecializationList());
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
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

export const SpecializationList = createAsyncThunk(
  "specializedGet",
  async (request, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await authApi.get(`/specializedGet`);
      if (response?.status === 200) {
        dispatch(setSpecilizationList(response?.data));
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
);

export const UpdateSpecialization = createAsyncThunk(
  "specializedUpdate",
  async (request, { dispatch }) => {
    try {
      // const { id, ...payload } = request; // Extract ID from the request
      const response = await authApi.put(
        `/specializedUpdate/${request?.id}`,
        request
      ); // Use `put` for updates
      console.log("response: ", response);

      if (response?.status === 200) {
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
            type: "success",
          })
        );
        dispatch(SpecializationList());
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error?.response?.data?.msg,
          type: "error",
        })
      );
      console.log("error: ", error);
    }
  }
);

export const DeleteSpecialization = createAsyncThunk(
  "specialization/delete",
  async (id, { dispatch }) => {
    try {
      const response = await authApi.delete(`/deleteSpecialized/${id}`); // Adjust the API endpoint
      if (response?.status === 200) {
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
            type: "success",
          })
        );
        dispatch(SpecializationList()); // Refresh the list after deletion
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error?.response?.data?.msg,
          type: "error",
        })
      );
      console.log("Error deleting specialization: ", error);
    }
  }
);

//------------- Resource module ----------------

export const CreateResourcePosition = createAsyncThunk(
  "userPosition/create",
  async (request, { dispatch }) => {
    try {
      const response = await authApi.post(`/userPosition`, request);

      // Optional: Handle response if needed
      if (response?.status === 200) {
        dispatch(resourcePositionList());
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
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

export const resourcePositionList = createAsyncThunk(
  "GetuserPosition/list",
  async (request, { dispatch }) => {
    dispatch(setLoading(true));

    try {
      const response = await authApi.get(`/GetuserPosition`);
      if (response?.status === 200) {
        dispatch(setResourcePosition(response?.data));
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
);

export const UpdateResourcePosition = createAsyncThunk(
  "userPosition/update",
  async (request, { dispatch }) => {
    try {
      // const { id, ...payload } = request; // Extract ID from the request
      const response = await authApi.put(
        `/userPosition/${request?.position_id}`,
        request
      ); // Use `put` for updates
      console.log("response: ", response);

      if (response?.status === 200) {
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
            type: "success",
          })
        );
        dispatch(resourcePositionList());
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error?.response?.data?.msg,
          type: "error",
        })
      );
      console.log("error: ", error);
    }
  }
);

export const DeleteResourcePosition = createAsyncThunk(
  "userPosition/delete",
  async (id, { dispatch }) => {
    try {
      const response = await authApi.delete(`/userPosition/${id}`); // Adjust the API endpoint
      if (response?.status === 200) {
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
            type: "success",
          })
        );
        dispatch(resourcePositionList()); // Refresh the list after deletion
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error?.response?.data?.msg,
          type: "error",
        })
      );
      console.log("Error deleting specialization: ", error);
    }
  }
);

// ------------- Resource status -----------------

export const CreateResourceStatus = createAsyncThunk(
  "userstatus/create",
  async (request, { dispatch }) => {
    try {
      const response = await authApi.post(`/userstatus`, request);

      // Optional: Handle response if needed
      if (response?.status === 200) {
        dispatch(resourceStatusList());
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
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

export const resourceStatusList = createAsyncThunk(
  "statustype/list",
  async (request, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await authApi.get(`/statustype/1`);
      if (response?.status === 200) {
        dispatch(setResourceStatus(response?.data));
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
);

export const UpdateResourceStatus = createAsyncThunk(
  "/update",
  async (request, { dispatch }) => {
    try {
      // const { id, ...payload } = request; // Extract ID from the request
      const response = await authApi.put(
        `/userstatus/${request?.status_id}`,
        request
      ); // Use `put` for updates
      console.log("response: ", response);

      if (response?.status === 200) {
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
            type: "success",
          })
        );
        dispatch(resourceStatusList());
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error?.response?.data?.msg,
          type: "error",
        })
      );
      console.log("error: ", error);
    }
  }
);

export const DeleteResourceStatus = createAsyncThunk(
  "userstatus/delete",
  async (id, { dispatch }) => {
    try {
      const response = await authApi.delete(`/userstatus/${id}`); // Adjust the API endpoint
      if (response?.status === 200) {
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
            type: "success",
          })
        );
        dispatch(resourceStatusList()); // Refresh the list after deletion
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error?.response?.data?.msg,
          type: "error",
        })
      );
      console.log("Error deleting specialization: ", error);
    }
  }
);

// -------------- client status ------------------

export const clientStatusList = createAsyncThunk(
  "statustype/list",
  async (request, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await authApi.get(`/statustype/2`);
      if (response?.status === 200) {
        dispatch(setClientStatus(response?.data));
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
);

export const CreateClientStatus = createAsyncThunk(
  "clinetuserstatus/create",
  async (request, { dispatch }) => {
    try {
      const response = await authApi.post(`/userstatus`, request);

      // Optional: Handle response if needed
      if (response?.status === 200) {
        dispatch(clientStatusList());
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
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

export const UpdateClientStatus = createAsyncThunk(
  "/clientupdate",
  async (request, { dispatch }) => {
    try {
      // const { id, ...payload } = request; // Extract ID from the request
      const response = await authApi.put(
        `/userstatus/${request?.status_id}`,
        request
      ); // Use `put` for updates
      console.log("response: ", response);

      if (response?.status === 200) {
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
            type: "success",
          })
        );
        dispatch(clientStatusList());
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error?.response?.data?.msg,
          type: "error",
        })
      );
      console.log("error: ", error);
    }
  }
);

export const DeleteClientStatus = createAsyncThunk(
  "userstatus/delete",
  async (id, { dispatch }) => {
    try {
      const response = await authApi.delete(`/userstatus/${id}`); // Adjust the API endpoint
      if (response?.status === 200) {
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
            type: "success",
          })
        );
        dispatch(clientStatusList()); // Refresh the list after deletion
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error?.response?.data?.msg,
          type: "error",
        })
      );
      console.log("Error deleting specialization: ", error);
    }
  }
);

// ------------------- Currency -----------------

export const CurrencyCode = createAsyncThunk(
  "currencyCodeGet/list",
  async (request, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await authApi.get(`/currencyCodeGet`);
      if (response?.status === 200) {
        dispatch(setCurrencyCode(response?.data));
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
);

export const currencyList = createAsyncThunk(
  "currency/list",
  async (request, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await authApi.get(`/currency`);
      if (response?.status === 200) {
        dispatch(setCurrency(response?.data));
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
);

export const CreateCurrency = createAsyncThunk(
  "currency/create",
  async (request, { dispatch }) => {
    try {
      const response = await authApi.post(`/currency`, request);
      if (response?.status === 200) {
        dispatch(currencyList());
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
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

export const UpdateCurrency = createAsyncThunk(
  "/currencyupdate",
  async (request, { dispatch }) => {
    try {
      // const { id, ...payload } = request; // Extract ID from the request
      const response = await authApi.put(
        `/currency/${request?.currency_id}`,
        request
      );
      if (response?.status === 200) {
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
            type: "success",
          })
        );
        dispatch(currencyList());
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error?.response?.data?.msg,
          type: "error",
        })
      );
      console.log("error: ", error);
    }
  }
);

export const DeleteCurrency = createAsyncThunk(
  "currency/delete",
  async (id, { dispatch }) => {
    try {
      const response = await authApi.delete(`/currency/${id}`); // Adjust the API endpoint
      if (response?.status === 200) {
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
            type: "success",
          })
        );
        dispatch(currencyList()); // Refresh the list after deletion
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error?.response?.data?.msg,
          type: "error",
        })
      );
      console.log("Error deleting specialization: ", error);
    }
  }
);

//--------------- Date formate ---------------

export const dateFormateList = createAsyncThunk(
  "getAllFormat/list",
  async (request, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await authApi.get(`/getAllFormat/1`);
      if (response?.status === 200) {
        dispatch(setDateFormate(response?.data));
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
);

export const CreateDateFormate = createAsyncThunk(
  "saveDateFormat/create",
  async (request, { dispatch }) => {
    try {
      const response = await authApi.post(`/saveDateFormat`, request);
      if (response?.status === 200) {
        dispatch(dateFormateList());
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
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

export const UpdateDateFormate = createAsyncThunk(
  "/updateDateFormat",
  async (request, { dispatch }) => {
    try {
      // const { id, ...payload } = request; // Extract ID from the request
      const response = await authApi.put(
        `/updateDateFormat/${request?.dateformat_id}`,
        request
      );
      if (response?.status === 200) {
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
            type: "success",
          })
        );
        dispatch(dateFormateList());
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error?.response?.data?.msg,
          type: "error",
        })
      );
      console.log("error: ", error);
    }
  }
);

export const DeleteDateFormate = createAsyncThunk(
  "updateDateFormat/delete",
  async (id, { dispatch }) => {
    try {
      const response = await authApi.delete(`/deletedateFormat/${id}`); // Adjust the API endpoint
      if (response?.status === 200) {
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
            type: "success",
          })
        );
        dispatch(dateFormateList()); // Refresh the list after deletion
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error?.response?.data?.msg,
          type: "error",
        })
      );
      console.log("Error deleting specialization: ", error);
    }
  }
);

// ---------------- Deciaml seperator -------------

export const decimalSeperatorList = createAsyncThunk(
  "getAllDecimalSeperator/list",
  async (request, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await authApi.get(`/getAllDecimalSeperator`);
      if (response?.status === 200) {
        dispatch(setDecimalSeparator(response?.data));
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
);

export const CreateDecimalSeperator = createAsyncThunk(
  "saveDecimalSeparator/create",
  async (request, { dispatch }) => {
    try {
      const response = await authApi.post(`/saveDecimalSeparator`, request);
      if (response?.status === 200) {
        dispatch(decimalSeperatorList());
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
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

export const UpdateDecimalSeperator = createAsyncThunk(
  "/updateDecimalSeparator",
  async (request, { dispatch }) => {
    try {
      // const { id, ...payload } = request; // Extract ID from the request
      const response = await authApi.put(
        `/updateDecimalSeparator/${request?.separator_id}`,
        request
      );
      if (response?.status === 200) {
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
            type: "success",
          })
        );
        dispatch(decimalSeperatorList());
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error?.response?.data?.msg,
          type: "error",
        })
      );
      console.log("error: ", error);
    }
  }
);

export const DeleteDecimalSeperator = createAsyncThunk(
  "/deleteSeparator",
  async (id, { dispatch }) => {
    try {
      const response = await authApi.delete(`/deleteSeparator/${id}`); // Adjust the API endpoint
      if (response?.status === 200) {
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
            type: "success",
          })
        );
        dispatch(decimalSeperatorList()); // Refresh the list after deletion
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error?.response?.data?.msg,
          type: "error",
        })
      );
      console.log("Error deleting specialization: ", error);
    }
  }
);

// --------------- languages ---------------

export const languageList = createAsyncThunk(
  "property/list",
  async (request, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await authApi.get(`/language`);
      if (response?.status === 200) {
        dispatch(setLanguage(response?.data));
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
);

export const getMemoQLanguageList = createAsyncThunk(
  "property/list",
  async (request, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await authApi.get(`/getMemoQLanguage`);
      if (response?.status === 200) {
        dispatch(setMemoQLanguage(response?.data));
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
);

// ------------Languages Translate --------------

export const languagesTranslateList = createAsyncThunk(
  "languagesAdminGetAll/list",
  async (request, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await authApi.get(`/languagesAdminGetAll`);
      if (response?.status === 200) {
        dispatch(setLanguageTranslate(response?.data));
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
);

export const CreatelanguageTranslate = createAsyncThunk(
  "languageSave/create",
  async (request, { dispatch }) => {
    try {
      const response = await authApi.post(`/languageSave`, request);
      if (response?.status === 200) {
        dispatch(languagesTranslateList());
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
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

export const UpdatelanguageTranslate = createAsyncThunk(
  "/langsupdate",
  async (request, { dispatch }) => {
    try {
      // const { id, ...payload } = request; // Extract ID from the request
      const response = await authApi.put(
        `/langsupdate/${request?.lang_id}`,
        request
      );
      if (response?.status === 200) {
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
            type: "success",
          })
        );
        dispatch(languagesTranslateList());
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error?.response?.data?.msg,
          type: "error",
        })
      );
      console.log("error: ", error);
    }
  }
);

// --------------- Property  ---------------

export const propertyList = createAsyncThunk(
  "property/list",
  async (request, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await authApi.get(`/property`);
      if (response?.status === 200) {
        dispatch(setProperty(response?.data));
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
);

export const CreateProperty = createAsyncThunk(
  "property/create",
  async (request, { dispatch }) => {
    try {
      const response = await authApi.post(`/property`, request);
      if (response?.status === 200) {
        dispatch(propertyList());
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
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

export const UpdateProperty = createAsyncThunk(
  "/propertyupdate",
  async (request, { dispatch }) => {
    try {
      // const { id, ...payload } = request; // Extract ID from the request
      const response = await authApi.put(
        `/property/${request?.property_id}`,
        request
      );
      if (response?.status === 200) {
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
            type: "success",
          })
        );
        dispatch(propertyList());
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error?.response?.data?.msg,
          type: "error",
        })
      );
      console.log("error: ", error);
    }
  }
);

export const DeleteProperty = createAsyncThunk(
  "/propertydelete",
  async (id, { dispatch }) => {
    try {
      const response = await authApi.delete(`/property/${id}`); // Adjust the API endpoint
      if (response?.status === 200) {
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
            type: "success",
          })
        );
        dispatch(propertyList()); // Refresh the list after deletion
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error?.response?.data?.msg,
          type: "error",
        })
      );
      console.log("Error deleting specialization: ", error);
    }
  }
);

// ---------------- property value -------------------

export const propertyValueList = createAsyncThunk(
  "propertyvalue/list",
  async (request, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await authApi.get(
        `/propertyvalues/${request?.property_id}`
      );
      if (response?.status === 200) {
        dispatch(setPropertyValue(response?.data));
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
);

export const CreatePropertyValue = createAsyncThunk(
  "propertyvalue/create",
  async (request, { dispatch }) => {
    try {
      const response = await authApi.post(`/values`, request);
      if (response?.status === 200) {
        dispatch(propertyValueList());
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
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

export const DeletePropertyValue = createAsyncThunk(
  "/propertydelete",
  async (id, { dispatch }) => {
    try {
      const response = await authApi.delete(`/values/${id}`); // Adjust the API endpoint
      if (response?.status === 200) {
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
            type: "success",
          })
        );
        dispatch(propertyValueList()); // Refresh the list after deletion
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error?.response?.data?.msg,
          type: "error",
        })
      );
      console.log("Error deleting specialization: ", error);
    }
  }
);

// --------------- Taxation -----------------

export const taxationList = createAsyncThunk(
  "taxStatusget/list",
  async (request, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await authApi.get(`/taxStatusget`);
      if (response?.status === 200) {
        dispatch(setTaxation(response?.data));
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
);

export const CreateTaxation = createAsyncThunk(
  "taxStatus/create",
  async (request, { dispatch }) => {
    try {
      const response = await authApi.post(`/taxStatus`, request);
      if (response?.status === 200) {
        dispatch(taxationList());
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
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

export const UpdateTaxation = createAsyncThunk(
  "/taxupdate",
  async (request, { dispatch }) => {
    try {
      // const { id, ...payload } = request; // Extract ID from the request
      const response = await authApi.put(
        `/taxstatus/${request?.tax_id}`,
        request
      );
      if (response?.status === 200) {
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
            type: "success",
          })
        );
        dispatch(taxationList());
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error?.response?.data?.msg,
          type: "error",
        })
      );
      console.log("error: ", error);
    }
  }
);

export const DeleteTaxation = createAsyncThunk(
  "/taxStatusDelete",
  async (id, { dispatch }) => {
    try {
      const response = await authApi.delete(`/taxStatusDelete/${id}`); // Adjust the API endpoint
      if (response?.status === 200) {
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
            type: "success",
          })
        );
        dispatch(taxationList()); // Refresh the list after deletion
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error?.response?.data?.msg,
          type: "error",
        })
      );
      console.log("Error deleting: ", error);
    }
  }
);

// --------------- ProjectTypes -----------------

export const ProjectTypesList = createAsyncThunk(
  "projecttypes/list",
  async (request, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await authApi.get(`/prtype`);
      if (response?.status === 200) {
        dispatch(setProjectTypes(response?.data));
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
);

export const CreateProjectTypes = createAsyncThunk(
  "projecttypes/create",
  async (request, { dispatch }) => {
    try {
      const response = await authApi.post(`/prtype`, request);
      if (response?.status === 200) {
        dispatch(ProjectTypesList());
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
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

export const UpdateProjectTypes = createAsyncThunk(
  "/projecttypesupdate",
  async (request, { dispatch }) => {
    try {
      // const { id, ...payload } = request; // Extract ID from the request
      const response = await authApi.put(
        `/prtype/${request?.pr_type_id}`,
        request
      );
      if (response?.status === 200) {
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
            type: "success",
          })
        );
        dispatch(ProjectTypesList());
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error?.response?.data?.msg,
          type: "error",
        })
      );
      console.log("error: ", error);
    }
  }
);

export const DeleteProjectTypes = createAsyncThunk(
  "/taxStatusDelete",
  async (id, { dispatch }) => {
    try {
      const response = await authApi.delete(`/prtype/${id}`); // Adjust the API endpoint
      if (response?.status === 200) {
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
            type: "success",
          })
        );
        dispatch(ProjectTypesList()); // Refresh the list after deletion
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error?.response?.data?.msg,
          type: "error",
        })
      );
      console.log("Error deleting : ", error);
    }
  }
);

// --------------  Scoop Status ------------------

export const scoopStatusList = createAsyncThunk(
  "scpStatus/list",
  async (request, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await authApi.get(`/scpstatus`);
      if (response?.status === 200) {
        dispatch(setScoopStatus(response?.data));
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
);

export const CreateScoopStatus = createAsyncThunk(
  "scpStatus/create",
  async (request, { dispatch }) => {
    try {
      const response = await authApi.post(`/scpStatus`, request);
      if (response?.status === 200) {
        dispatch(scoopStatusList());
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
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

export const UpdateScoopStatus = createAsyncThunk(
  "/scpStatusupdate",
  async (request, { dispatch }) => {
    try {
      // const { id, ...payload } = request; // Extract ID from the request
      const response = await authApi.put(
        `/scpStatus/${request?.item_status_id}`,
        request
      );
      if (response?.status === 200) {
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
            type: "success",
          })
        );
        dispatch(scoopStatusList());
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error?.response?.data?.msg,
          type: "error",
        })
      );
      console.log("error: ", error);
    }
  }
);

export const DeleteScoopStatus = createAsyncThunk(
  "/scpStatusDelete",
  async (id, { dispatch }) => {
    try {
      const response = await authApi.delete(`/scpStatus/${id}`); // Adjust the API endpoint
      if (response?.status === 200) {
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
            type: "success",
          })
        );
        dispatch(scoopStatusList()); // Refresh the list after deletion
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error?.response?.data?.msg,
          type: "error",
        })
      );
      console.log("Error deleting : ", error);
    }
  }
);

// --------------- Job Status --------------------

export const jobStatusList = createAsyncThunk(
  "jobStatus/list",
  async (request, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await authApi.get(`/jobStatus`);
      if (response?.status === 200) {
        dispatch(setJobStatus(response?.data));
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
);

export const CreateJobStatus = createAsyncThunk(
  "jobStatus/create",
  async (request, { dispatch }) => {
    try {
      const response = await authApi.post(`/jobStatus`, request);
      if (response?.status === 200) {
        dispatch(jobStatusList());
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
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

export const UpdateJobStatus = createAsyncThunk(
  "/jobStatusupdate",
  async (request, { dispatch }) => {
    try {
      // const { id, ...payload } = request; // Extract ID from the request
      const response = await authApi.put(
        `/jobStatus/${request?.jb_status_id}`,
        request
      );
      if (response?.status === 200) {
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
            type: "success",
          })
        );
        dispatch(jobStatusList());
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error?.response?.data?.msg,
          type: "error",
        })
      );
      console.log("error: ", error);
    }
  }
);

export const DeleteJobStatus = createAsyncThunk(
  "/jobStatusDelete",
  async (id, { dispatch }) => {
    try {
      const response = await authApi.delete(`/jobStatus/${id}`); // Adjust the API endpoint
      if (response?.status === 200) {
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
            type: "success",
          })
        );
        dispatch(jobStatusList()); // Refresh the list after deletion
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error?.response?.data?.msg,
          type: "error",
        })
      );
      console.log("Error deleting : ", error);
    }
  }
);

// ------------------ Jobs ----------------------

export const jobList = createAsyncThunk(
  "Jobsget/list",
  async (request, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await authApi.get(`/Jobsget`);
      if (response?.status === 200) {
        dispatch(setJobs(response?.data));
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
);

export const CreateJobs = createAsyncThunk(
  "Jobs/create",
  async (request, { dispatch }) => {
    try {
      const response = await authApi.post(`/Jobs`, request);
      if (response?.status === 200) {
        dispatch(jobList());
        dispatch(
          showSnackbar({
            message: response?.data?.msg || "Successfully Inserted",
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

export const UpdateJobs = createAsyncThunk(
  "/Jobsupdate",
  async (request, { dispatch }) => {
    try {
      // const { id, ...payload } = request; // Extract ID from the request
      const response = await authApi.put(
        `/Jobs/${request?.job_id}`,
        request
      );
      if (response?.status === 200) {
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
            type: "success",
          })
        );
        dispatch(jobList());
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error?.response?.data?.msg,
          type: "error",
        })
      );
      console.log("error: ", error);
    }
  }
);

export const DeleteJobs = createAsyncThunk(
  "/JobsDelete",
  async (id, { dispatch }) => {
    try {
      const response = await authApi.delete(`/jobsDelete/${id}`); // Adjust the API endpoint
      if (response?.status === 200) {
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
            type: "success",
          })
        );
        dispatch(jobList()); // Refresh the list after deletion
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error?.response?.data?.msg,
          type: "error",
        })
      );
      console.log("Error deleting : ", error);
    }
  }
);

// ======================= Price Units =============================
// ---------------------- Master Price ----------------------

export const MasterPriceList = createAsyncThunk(
  "masterPriceGet/list",
  async (request, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await authApi.get(`/masterPriceGet`);
      if (response?.status === 200) {
        dispatch(setMasterPrice(response?.data));
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
);

export const CreateMasterPrice = createAsyncThunk(
  "masterpricesave/create",
  async (request, { dispatch }) => {
    try {
      const response = await authApi.post(`/masterpricesave`, request);
      if (response?.status === 200) {
        dispatch(MasterPriceList());
        dispatch(
          showSnackbar({
            message: response?.data?.msg || "Successfully Inserted",
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

export const UpdateMasterPrice = createAsyncThunk(
  "/masterpriceupdate",
  async (request, { dispatch }) => {
    try {
      // const { id, ...payload } = request; // Extract ID from the request
      const response = await authApi.put(
        `/masterpriceupdate/${request?.master_price_id}`,
        request
      );
      if (response?.status === 200) {
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
            type: "success",
          })
        );
        dispatch(MasterPriceList());
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error?.response?.data?.msg,
          type: "error",
        })
      );
      console.log("error: ", error);
    }
  }
);

export const DeleteMasterPrice = createAsyncThunk(
  "/masterPriceDelete",
  async (id, { dispatch }) => {
    try {
      const response = await authApi.delete(`/masterPriceDelete/${id}`); // Adjust the API endpoint
      if (response?.status === 200) {
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
            type: "success",
          })
        );
        dispatch(MasterPriceList()); // Refresh the list after deletion
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error?.response?.data?.msg,
          type: "error",
        })
      );
      console.log("Error deleting : ", error);
    }
  }
);

// --------------------- Rounding Price ----------------------

export const RoundingPriceList = createAsyncThunk(
  "roundingPriceGetAll/list",
  async (request, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await authApi.get(`/roundingPriceGetAll`);
      if (response?.status === 200) {
        dispatch(setRoundingPrice(response?.data));
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
);

export const CreateRoundingPrice = createAsyncThunk(
  "roundingPriceSave/create",
  async (request, { dispatch }) => {
    try {
      const response = await authApi.post(`/roundingPriceSave`, request);
      if (response?.status === 200) {
        dispatch(RoundingPriceList());
        dispatch(
          showSnackbar({
            message: response?.data?.msg || "Successfully Inserted",
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

export const UpdateRoundingPrice = createAsyncThunk(
  "/roundingPriceUpdate",
  async (request, { dispatch }) => {
    try {
      // const { id, ...payload } = request; // Extract ID from the request
      const response = await authApi.put(
        `/roundingPriceUpdate/${request?.rounding_id}`,
        request
      );
      if (response?.status === 200) {
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
            type: "success",
          })
        );
        dispatch(RoundingPriceList());
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error?.response?.data?.msg,
          type: "error",
        })
      );
      console.log("error: ", error);
    }
  }
);

export const DeleteRoundingPrice = createAsyncThunk(
  "/deleteRoundingprice",
  async (id, { dispatch }) => {
    try {
      const response = await authApi.delete(`/deleteRoundingprice/${id}`); // Adjust the API endpoint
      if (response?.status === 200) {
        dispatch(
          showSnackbar({
            message: response?.data?.msg || "Successfully Deleted",
            type: "success",
          })
        );
        dispatch(RoundingPriceList()); // Refresh the list after deletion
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error?.response?.data?.msg,
          type: "error",
        })
      );
      console.log("Error deleting : ", error);
    }
  }
);

// --------------------- Child Price ----------------------

export const ChildPriceList = createAsyncThunk(
  "childPriceGet/list",
  async (request, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await authApi.get(`/childPriceGet`);
      if (response?.status === 200) {
        dispatch(setChildPrice(response?.data));
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
);

export const CreateChildPrice = createAsyncThunk(
  "childpricesave/create",
  async (request, { dispatch }) => {
    try {
      const response = await authApi.post(`/childpricesave`, request);
      if (response?.status === 200) {
        dispatch(ChildPriceList());
        dispatch(
          showSnackbar({
            message: response?.data?.msg || "Successfully Inserted",
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

export const UpdateChildPrice = createAsyncThunk(
  "/childpriceupdate",
  async (request, { dispatch }) => {
    try {
      // const { id, ...payload } = request; // Extract ID from the request
      const response = await authApi.put(
        `/childpriceupdate/${request?.child_price_id}`,
        request
      );
      if (response?.status === 200) {
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
            type: "success",
          })
        );
        dispatch(ChildPriceList());
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error?.response?.data?.msg,
          type: "error",
        })
      );
      console.log("error: ", error);
    }
  }
);

export const DeleteChildPrice = createAsyncThunk(
  "/childPriceDelete",
  async (id, { dispatch }) => {
    try {
      const response = await authApi.delete(`/childPriceDelete/${id}`); // Adjust the API endpoint
      if (response?.status === 200) {
        dispatch(
          showSnackbar({
            message: response?.data?.msg || "Successfully Deleted",
            type: "success",
          })
        );
        dispatch(ChildPriceList()); // Refresh the list after deletion
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error?.response?.data?.msg,
          type: "error",
        })
      );
      console.log("Error deleting : ", error);
    }
  }
);

export const GetOneChildPrice = createAsyncThunk(
  "getOneChildPrice",
  async (id, { dispatch }) => {
    try {
      const response = await authApi.get(`/childpriceGetOne/${id}`);
      if (response?.status === 200) {
        dispatch(getSingleChildPrice(response?.data));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
)

export const DropdownMasterPrice = createAsyncThunk(
  "masterPriceGetdata/list",
  async (request, { dispatch }) => {
    try {
      const response = await authApi.get(`/masterPriceGetdata`);
      if (response?.status === 200) {
        dispatch(setDropdownMasterPrice(response?.data));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
);

export const DropdownMasterUnits = createAsyncThunk(
  "mastergetPrice/list",
  async (request, { dispatch }) => {
    try {
      const response = await authApi.get(`/mastergetPrice`);
      if (response?.status === 200) {
        dispatch(setDropdownMasterUnits(response?.data));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
);

// ---------------- Banking info ------------------

export const BankingInfoList = createAsyncThunk(
  "bankDetails/list",
  async (request, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await authApi.get(`/bankDetails`);
      if (response?.status === 200) {
        dispatch(setBankingInfo(response?.data));
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
);

export const CreateBankingInfo = createAsyncThunk(
  "bankDetails/create",
  async (request, { dispatch }) => {
    try {
      const response = await authApi.post(`/bankDetails`, request);
      if (response?.status === 200) {
        dispatch(BankingInfoList());
        dispatch(
          showSnackbar({
            message: response?.data?.msg || "Successfully Inserted",
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

export const UpdateBankingInfo = createAsyncThunk(
  "/bankDetailsUpdate",
  async (request, { dispatch }) => {
    try {
      // const { id, ...payload } = request; // Extract ID from the request
      const response = await authApi.put(
        `/bankDetails/${request?.bank_id}`,
        request
      );
      if (response?.status === 200) {
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
            type: "success",
          })
        );
        dispatch(BankingInfoList());
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error?.response?.data?.msg,
          type: "error",
        })
      );
      console.log("error: ", error);
    }
  }
);

export const DeleteBankingInfo = createAsyncThunk(
  "/deletebankDetails",
  async (id, { dispatch }) => {
    try {
      const response = await authApi.delete(`/bankDetails/${id}`); // Adjust the API endpoint
      if (response?.status === 200) {
        dispatch(
          showSnackbar({
            message: response?.data?.msg || "Successfully Deleted",
            type: "success",
          })
        );
        dispatch(BankingInfoList()); // Refresh the list after deletion
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error?.response?.data?.msg,
          type: "error",
        })
      );
      console.log("Error deleting : ", error);
    }
  }
);

// ----------------- Invoice Due --------------------

export const InvoiceDueList = createAsyncThunk(
  "getAllInvoicePeriod/list",
  async (request, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await authApi.get(`/getAllInvoicePeriod`);
      if (response?.status === 200) {
        dispatch(setInvoiceDue(response?.data));
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
);

export const UpdateInvoiceDue = createAsyncThunk(
  "/updateInvoicePeriod",
  async (request, { dispatch }) => {
    try {
      // const { id, ...payload } = request; // Extract ID from the request
      const response = await authApi.put(
        `/updateInvoicePeriod/${request?.invoice_due_id}`,
        request
      );
      if (response?.status === 200) {
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
            type: "success",
          })
        );
        dispatch(InvoiceDueList());
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error?.response?.data?.msg,
          type: "error",
        })
      );
      console.log("error: ", error);
    }
  }
);

// --------------- Invoice Settings ---------------

export const InvoiceSettingList = createAsyncThunk(
  "invoiceSettings/list",
  async (request, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await authApi.get(`/invoiceSettings`);
      if (response?.status === 200) {
        dispatch(setInvoiceSetting(response?.data));
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
);

export const GetSingleInvoiceSetting = createAsyncThunk(
  "invoiceSettings/single",
  async (id, { dispatch }) => {
    try {
      const response = await authApi.get(`/invoiceSettings/${id}`);
      if (response?.status === 200) {
        dispatch(getSingleInvoiceSetting(response?.data));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
)

export const UpdateInvoiceSetting = createAsyncThunk(
  "/updateInvoiceSetting",
  async (request, { dispatch }) => {
    try {
      // const { id, ...payload } = request; // Extract ID from the request
      const response = await authApi.put(
        `/invoiceSettings/${request?.id}`,
        request
      );
      if (response?.status === 200) {
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
            type: "success",
          })
        );
        dispatch(InvoiceSettingList());
      }
    } catch (error) {
      dispatch(
        showSnackbar({
          message: error?.response?.data?.msg,
          type: "error",
        })
      );
      console.log("error: ", error);
    }
  }
);

export const DropdownClientCenter = createAsyncThunk(
  "centerClientGet/list",
  async (request, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await authApi.get(`/centerClientGet`);
      if (response?.status === 200) {
        dispatch(setDropdownClient(response?.data));
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
);

// ------------------ Email list -------------------

export const EmailList = createAsyncThunk(
  "getAllsentEmail/list",
  async (request, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await authApi.get(`/getAllsentEmail`);
      if (response?.status === 200) {
        dispatch(setEmail(response?.data));
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
);

// -----------------Business Unit --------------------

export const AbbreviationMatch = createAsyncThunk(
  "abbrivationMatch/list",
  async (request, { dispatch }) => {
    try {
      const response = await authApi.get(`/abbrivationMatch/${request}`);
      if (response?.status === 200) {
        dispatch(setAbbreviation(response?.data));
        if(request === response?.data?.abbrivation){
          dispatch(
            showSnackbar({
              message: response?.data?.msg || "Duplicate Abbreviation is not allowed",
              type: "info",
            })
          );
        }
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
);

export const BusinessUnitList = createAsyncThunk(
  "centerDateget/list",
  async (request, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await authApi.get(`/centerDateget`);
      if (response?.status === 200) {
        dispatch(setBusinessUnit(response?.data));
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
);

export const CreateBusinessUnit = createAsyncThunk(
  "centersave/create",
  async (request, { dispatch }) => {
    try {
      const response = await authApi.post(`/centersave`, request);
      if (response?.status === 200) {
        dispatch(BusinessUnitList());
        dispatch(
          showSnackbar({
            message: response?.data?.msg || "Successfully Inserted",
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

export const UpdateBusinessUnit = createAsyncThunk(
  "/centerupdate",
  async (request, { dispatch }) => {
    try {
      // const { id, ...payload } = request; // Extract ID from the request
      const response = await authApi.put(
        `/centerupdate/${request?.center_id}`,
        request
      );
      if (response?.status === 200) {
        dispatch(BusinessUnitList());
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
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
      console.log("error: ", error);
    }
  }
);

export const DeleteBusinessUnit = createAsyncThunk(
  "/deleteCenter",
  async (id, { dispatch }) => {
    try {
      const response = await authApi.delete(`/deleteCenter/${id}`);
      if (response?.status === 200 && ! response?.data?.status) {
        dispatch(BusinessUnitList());
        dispatch(
          showSnackbar({
            message: response?.data?.msg || "Successfully Deleted",
            type: "success",
          })
        );
      }
      if (response?.data?.status === 422) {
        dispatch(
          showSnackbar({
            message: response?.data?.msg ,
            type: "info",
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
      console.log("Error deleting : ", error);
    }
  }
);

// ------------------ Template --------------------

export const EmailTemplateList = createAsyncThunk(
  "emailTemplateGetAll/list",
  async (request, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await authApi.get(`/emailTemplateGetAll`);
      if (response?.status === 200) {
        dispatch(setEmailTemplate(response?.data));
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
);

export const CreateEmailTemplate = createAsyncThunk(
  "saveEmailTemplate/create",
  async (request, { dispatch }) => {
    try {
      const response = await authApi.post(`/saveEmailTemplate`, request);
      if (response?.status === 200) {
        dispatch(EmailTemplateList());
        dispatch(
          showSnackbar({
            message: response?.data?.msg || "Successfully Inserted",
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

export const UpdateEmailTemplate = createAsyncThunk(
  "/emailTemplateUpdate",
  async (request, { dispatch }) => {
    try {
      // const { id, ...payload } = request; // Extract ID from the request
      const response = await authApi.put(
        `/emailTemplateUpdate/${request?.template_id}`,
        request
      );
      if (response?.status === 200) {
        dispatch(EmailTemplateList());
        dispatch(
          showSnackbar({
            message: response?.data?.msg,
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
      console.log("error: ", error);
    }
  }
);