import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading } from "../../Slice/loading/loadingSlice";
import authApi from "../../authApi";
import { getSingleClient, getSingleClientPrice, setChildPriceList, setClientAccount, setClientContact, setClientContactList, setClientLoginDetailList, setClientNumber, setClientPayment, setClientPaymentList, setClients, setClientStatus, setClientSteppers, setCountries, setCustomerPriceList, setLanguagesDropdown, setLogs, setMasterPriceList, setNumber, setSingleClientAccount, setSpecializationdDropdown, setTaxdDropdown, setViewDirectContact, setViewDirectData, setUserManager, setWorkType, setScoopDetail, setAllLanguages, setcompanyContactList, setFilterListingReport, setJobSummeryContact, setJobSummeryResource, setJobStatus } from "../../Slice/ClientModule/ClientSlice";
import { showSnackbar } from "../../Slice/snackbar/snackbarSlice";
import axios from "axios";


// ----------------- Account ---------------------
export const GetNumber = createAsyncThunk(
    "clientProfileNumber/list",
    async (request, { dispatch }) => {
      dispatch(setLoading(true));
      try {
        const response = await authApi.get(`/clientProfileNumber/2`);
        if (response?.status === 200) {
          dispatch(setNumber(response?.data));
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
  );
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
  export const CreateClientAccount = createAsyncThunk(
    "clientsaveindirect/create",
    async (request, { dispatch }) => {
      try {
        const response = await authApi.post(`/clientsaveindirect`, request);
        if (response?.status === 200) {
          dispatch(ClientAccountList());
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
  export const UpdateClientAccount = createAsyncThunk(
    "/clientupdateindirect",
    async ({formData, navigate}, { dispatch }) => {

      try {
        // const { id, ...payload } = request; // Extract ID from the request
        const response = await authApi.put(
          `/clientupdateindirect/${formData?.iClientId}`,
          formData
        );
        if (response?.status === 200) {
          navigate("/client/account");
          dispatch(
            showSnackbar({
              message: response?.data?.msg,
              type: "success",
            })
          );
          dispatch(ClientAccountList());
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
  export const GetSingleClientAccount = createAsyncThunk(
    "client_indirect_update/single",
    async (id, { dispatch }) => {
      try {
        const response = await authApi.get(`/client_indirect_update/${id}`);
        if (response?.status === 200) {
          dispatch(setSingleClientAccount(response?.data));
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
  )
  export const DeleteClientAccount = createAsyncThunk(
    "/deleteClientindirect",
    async (id, { dispatch }) => {
      try {
        const response = await authApi.delete(`/deleteClientindirect/${id}`);
        if (response?.status === 200 ) {
          dispatch(ClientAccountList());
          dispatch(
            showSnackbar({
              message: response?.data?.msg || "Successfully Deleted",
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
        console.log("Error deleting : ", error);
      }
    }
  );
  export const SaveLogs = createAsyncThunk(
    "saveLog/create",
    async (request, { dispatch }) => {
      try {
        const response = await authApi.post(`/saveLog`, request);
        if (response?.status === 200) {
          dispatch(setLogs());
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  );
  

  // ---------------------- Client -----------------------

  // ------------ Common Dropdowns ---------------

  export const TaxDropdown = createAsyncThunk(
    "itemTaxget/list",
    async (request, { dispatch }) => {
      dispatch(setLoading(true));
      try {
        const response = await authApi.get(`/itemTaxget`);
        if (response?.status === 200) {
          dispatch(setTaxdDropdown(response?.data));
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
  );
  export const SpecializationDropdown = createAsyncThunk(
    "getAllSpecialization/list",
    async (request, { dispatch }) => {
      try {
        const response = await authApi.get(`/getAllSpecialization`);
        if (response?.status === 200) {
          dispatch(setSpecializationdDropdown(response?.data));
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
  );
  export const MasterPriceListDropdown = createAsyncThunk(
    "masterPriceitemgetFromPriceList/list",
    async (request, { dispatch }) => {
      try {
        const response = await authApi.get(`/masterPriceitemgetFromPriceList`);
        if (response?.status === 200) {
          dispatch(setMasterPriceList(response?.data));
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
  );
  export const ChildPriceDropdown = createAsyncThunk(
    "childPriceitemget/list",
    async (request, { dispatch }) => {
      try {
        const response = await authApi.get(`/childPriceitemget`);
        if (response?.status === 200) {
          dispatch(setChildPriceList(response?.data));
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
  );
  export const GetLanguages = createAsyncThunk(
    "languagesGet/list",
    async (request, { dispatch }) => {
      try {
        const response = await authApi.get(`/languagesGet`);
        if (response?.status === 200) {
          dispatch(setLanguagesDropdown(response?.data));
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
  );
  export const ClientProfileNumber = createAsyncThunk(
    "clientProfileNumber/list",
    async (request, { dispatch }) => {
      dispatch(setLoading(true));
      try {
        const response = await authApi.get(`/clientProfileNumber/1`);
        if (response?.status === 200) {
          dispatch(setClientNumber(response?.data));
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
  );
  export const CountryList = createAsyncThunk(
    "getCountry/list",
    async (request, { dispatch }) => {
      dispatch(setLoading(true));
      try {
        const response = await authApi.get(`/getCountry`);
        if (response?.status === 200) {
          dispatch(setCountries(response?.data));
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
  );
  export const UserManager = createAsyncThunk(
    "userManager/2",
    async (request, { dispatch }) => {
      dispatch(setLoading(true));
      try {
        const response = await authApi.get(`/userManager/2`);
        if (response?.status === 200) {
          dispatch(setUserManager(response?.data));
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
  );
  export const WorkType = createAsyncThunk(
    "prtypeactive",
    async (request, { dispatch }) => {
      dispatch(setLoading(true));
      try {
        const response = await authApi.get(`/prtypeactive`);
        if (response?.status === 200) {
          dispatch(setWorkType(response?.data));
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
  );
  export const ScoopDetails = createAsyncThunk(
    "scoopdetailItemStatusGet",
    async (request, { dispatch }) => {
      dispatch(setLoading(true));
      try {
        const response = await authApi.get(`/scoopdetailItemStatusGet`);
        if (response?.status === 200) {
          dispatch(setScoopDetail(response?.data));
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
  );
  export const JobSummeryContact = createAsyncThunk(
    "JobsummerycontactGet",
    async (request, { dispatch }) => {
      dispatch(setLoading(true));
      try {
        const response = await authApi.get(`/JobsummerycontactGet`);
        if (response?.status === 200) {
          dispatch(setJobSummeryContact(response?.data));
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
  );
  export const JobSummeryResource = createAsyncThunk(
    "jobdetailresourceGet",
    async (request, { dispatch }) => {
      dispatch(setLoading(true));
      try {
        const response = await authApi.get(`/jobdetailresourceGet`);
        if (response?.status === 200) {
          dispatch(setJobSummeryResource(response?.data));
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
  );
  export const JobStatusdetail = createAsyncThunk(
    "jobdetailItemStatusGet",
    async (request, { dispatch }) => {
      dispatch(setLoading(true));
      try {
        const response = await authApi.get(`/jobdetailItemStatusGet`);
        if (response?.status === 200) {
          dispatch(setJobStatus(response?.data));
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
  );
  export const AllLanguages = createAsyncThunk(
    "allLanguages",
    async (request, { dispatch }) => {
      dispatch(setLoading(true));
      try {
        const response = await authApi.get(`/allLanguages`);
        if (response?.status === 200) {
          dispatch(setAllLanguages(response?.data));
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
  );
  export const ClientCompanysContactList = createAsyncThunk(
    "contact",
    async (request, { dispatch }) => {
      dispatch(setLoading(true));
      try {
        const response = await authApi.get(`/contact/${request}`);
        if (response?.status === 200) {
          dispatch(setcompanyContactList(response?.data));
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
  );
  export const ClientsStatusList = createAsyncThunk(
    "clientstatusactive/list",
    async (request, { dispatch }) => {
      dispatch(setLoading(true));
      try {
        const response = await authApi.get(`/clientstatusactive`);
        if (response?.status === 200) {
          dispatch(setClientStatus(response?.data));
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
  );


  export const ClientsList = createAsyncThunk(
    "clients/list",
    async (request, { dispatch }) => {
      dispatch(setLoading(true));
      try {
        const response = await authApi.get(`/clients`);
        if (response?.status === 200) {
          dispatch(setClients(response?.data));
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
  );
  export const CreateClient = createAsyncThunk(
    "clientsave/create",
    async (request, { dispatch }) => {
      try {
        const response = await authApi.post(`/clientsave`, request);
        if (response?.status === 200) {
          dispatch(setClientSteppers(response?.data));
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
  export const UpdateClient = createAsyncThunk(
    "/clientUpdate",
    async ({formattedPayload,id}, { dispatch }) => {
      try {
        // const { id, ...payload } = request; // Extract ID from the request
        const response = await authApi.put(
          `/clientsave/${id}`,
          formattedPayload
        );
        if (response?.status === 200) {
          dispatch(getSingleClient(response?.data));
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
  export const GetOneClient = createAsyncThunk(
    "getOneChildPrice",
    async (id, { dispatch }) => {
      try {
        const response = await authApi.get(`/client/${id}`);
        if (response?.status === 200) {
          dispatch(getSingleClient(response?.data));
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
  )
  // -------------- step-2 --------------
  export const ClientContactList = createAsyncThunk(
    "contact/list",
    async (id, { dispatch }) => {
      dispatch(setLoading(true));
      try {
        const response = await authApi.get(`/contact/${id}`);
        if (response?.status === 200) {
          dispatch(setClientContactList(response?.data));
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
  );
  export const CreateClientContact = createAsyncThunk(
    "contactsave/create",
    async (request, { dispatch }) => {
      try {
        const response = await authApi.post(`/contactsave`, request);
        if (response?.status === 200) {
          dispatch(setClientContact(response?.data));
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
  export const UpdateContactList = createAsyncThunk(
    "/updatecontactsave",
    async (request, { dispatch }) => {
      try {
        // const { id, ...payload } = request; // Extract ID from the request
        const response = await authApi.post(
          `/contactsave/${request?.iContactId}`,
          request
        );
        if (response?.status === 200) {
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
  export const DeleteClientContact = createAsyncThunk(
    "/contactdelete",
    async (id, { dispatch }) => {
      try {
        const response = await authApi.delete(`/contactdelete/${id}`);
        if (response?.status === 200 ) {
          dispatch(ClientContactList(id));
          dispatch(
            showSnackbar({
              message: response?.data?.msg || "Successfully Deleted",
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
        console.log("Error deleting : ", error);
      }
    }
  );
  export const DeleteClient = createAsyncThunk(
    "/clientdelete",
    async (request, { dispatch }) => {
      try {
        const response = await authApi.delete(`/clientdelete/${request.id}/${request.img ? request.img : "blank.png"}`);
        if (response?.status === 200 ) {
          dispatch(ClientsList());
          dispatch(
            showSnackbar({
              message: response?.data?.msg || "Successfully Deleted",
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
        console.log("Error deleting : ", error);
      }
    }
  );
  // -------------- step-3 --------------
  export const CustomerPriceListing = createAsyncThunk(
    "customerpriceAll/list",
    async (request, { dispatch }) => {
      dispatch(setLoading(true));
      try {
        const response = await authApi.get(`/customerpriceAll/1`);
        if (response?.status === 200) {
          dispatch(setCustomerPriceList(response?.data));
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.log("error: ", error);
        dispatch(setLoading(false));
      }
    }
  );
  export const CreateClientPrice = createAsyncThunk(
    "customerpriceSave/create",
    async (request, { dispatch }) => {
      try {
        const response = await authApi.post(`/customerpriceSave`, request);
        if (response?.status === 200) {
          dispatch(
            showSnackbar({
              message: response?.data?.msg || "Successfully Inserted",
              type: "success",
            })
          );
          dispatch(CustomerPriceListing());
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
  export const UpdateClientPrice = createAsyncThunk(
    "/customerpriceUpdate",
    async (request, { dispatch }) => {
      try {
        // const { id, ...payload } = request; // Extract ID from the request
        const response = await authApi.put(
          `/customerpriceUpdate/${request?.price_list_id }`,
          request
        );
        if (response?.status === 200) {
          dispatch(
            showSnackbar({
              message: response?.data?.msg,
              type: "success",
            })
          );
          dispatch(CustomerPriceListing());
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
  export const DeleteClientPriceList = createAsyncThunk(
    "/deleteExtrnlorClntPricelist",
    async (id, { dispatch }) => {
      try {
        const response = await authApi.delete(`/deleteExtrnlorClntPricelist/1/${id}`);
        if (response?.status === 200 ) {
          dispatch(CustomerPriceListing());
          dispatch(
            showSnackbar({
              message: response?.data?.msg || "Successfully Deleted",
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
        console.log("Error deleting : ", error);
      }
    }
  );
  export const GetOneClientPrice = createAsyncThunk(
    "customerpriceGetOne",
    async (id, { dispatch }) => {
      try {
        const response = await authApi.get(`/customerpriceGetOne/${id}`);
        if (response?.status === 200) {
          dispatch(getSingleClientPrice(response?.data));
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
  )
  export const CopyToOtherUser = createAsyncThunk(
    "/priceListCopyToOtherUser",
    async (request, { dispatch }) => {
      try {
        // const { id, ...payload } = request; // Extract ID from the request
        const response = await authApi.post(
          `/priceListCopyToOtherUser`,request
        );
        if (response?.status === 200) {
          dispatch(
            showSnackbar({
              message: response?.data?.msg || "Successfully Copied",
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

  // -------------- step-4 --------------
  export const CreateClientPayment = createAsyncThunk(
    "paymentsave/create",
    async (request, { dispatch }) => {
      try {
        const response = await authApi.post(`/paymentsave`, request);
        if (response?.status === 200) {
          dispatch(setClientPayment(response?.data));
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
  export const UpdateClientPayment = createAsyncThunk(
    "/paymentdirectUpdate",
    async (request, { dispatch }) => {
      try {
        // const { id, ...payload } = request; // Extract ID from the request
        const response = await authApi.post(
          `/paymentdirectUpdate/${request?.iClientId}/2`,
          request
        );
        if (response?.status === 200) {
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
  export const ClientPaymentList = createAsyncThunk(
    "getClientpayment/list",
    async (id, { dispatch }) => {
      dispatch(setLoading(true));
      try {
        const response = await authApi.get(`getClientpayment/${id}`);
        if (response?.status === 200) {
          dispatch(setClientPaymentList(response?.data));
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
  );
  // -------------- step-5 --------------
  export const CreateClientLogin = createAsyncThunk(
    "directclientlogin/create",
    async (request, { dispatch }) => {
      try {
        const response = await authApi.post(`/directclientlogin`, request);
        if (response?.status === 200) {
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
  export const UpdateClientLogin = createAsyncThunk(
    "/update_directclientlogin",
    async (request, { dispatch }) => {
      try {
        // const { id, ...payload } = request; // Extract ID from the request
        const response = await authApi.put(
          `/update_directclientlogin/${request?.iClientId}`,
          request
        );
        if (response?.status === 200) {
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
  export const GetClientLoginDetailList = createAsyncThunk(
    "clientdirect_login_details/list",
    async (id, { dispatch }) => {
      dispatch(setLoading(true));
      try {
        const response = await authApi.get(`/clientdirect_login_details/${id}`);
        if (response?.status === 200) {
          dispatch(setClientLoginDetailList(response?.data));
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
  );
  export const DeleteClientLoginDetail = createAsyncThunk(
    "/deleteClient",
    async (id, { dispatch }) => {
      try {
        const response = await authApi.delete(`/deleteClient/${id}`);
        if (response?.status === 200 ) {
          dispatch(
            showSnackbar({
              message: response?.data?.msg || "Successfully Deleted",
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
        console.log("Error deleting : ", error);
      }
    }
  );
// -------------- View Page get api --------------

export const ViewDirectDataList = createAsyncThunk(
  "viewdirectdataget/list",
  async (id, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await authApi.get(`/viewdirectdataget/${id}`);
      if (response?.status === 200) {
        dispatch(setViewDirectData(response?.data));
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
);
export const ViewDirectContactList = createAsyncThunk(
  "viewcontactdirectEdit/list",
  async (id, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await authApi.get(`/viewcontactdirectEdit/${id}`);
      if (response?.status === 200) {
        dispatch(setViewDirectContact(response?.data));
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
);