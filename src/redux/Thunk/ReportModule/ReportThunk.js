import { createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../../authApi";
import { showSnackbar } from "../../Slice/snackbar/snackbarSlice";
import { setInvoiceSetting, setJobReport, setSingleClientInvoiceLinguist } from "../../Slice/ReportModule/ReportSlice";
import { setLoading } from "../../Slice/loading/loadingSlice";
import { setInvoiceReport } from "../../Slice/ReportModule/ReportSlice";
import { setLinguistReport } from "../../Slice/ReportModule/ReportSlice";
import { setMarginReport } from "../../Slice/ReportModule/ReportSlice";
import { setSingleClientInvoice } from "../../Slice/ReportModule/ReportSlice";
import { setScoopReport } from "../../Slice/ReportModule/ReportSlice";

export const FilterScoopReport = createAsyncThunk(
  "scoopReportCustomFilter/create",
  async (request, { dispatch }) => {
      dispatch(setLoading(true));
    try {
      const response = await authApi.post(`/scoopReportCustomFilter`, request);
      if (response?.status === 200) {
          dispatch(setLoading(false));    
        dispatch(setScoopReport(response?.data));
      //   dispatch(
      //     showSnackbar({
      //       message: response?.data?.msg || "Successfully Inserted",
      //       type: "success",
      //     })
      //   );
      }
    } catch (error) {
      dispatch(setLoading(false));
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
export const FilterJobsReport = createAsyncThunk(
    "jobReportCustomFilter/create",
    async (request, { dispatch }) => {
        dispatch(setLoading(true));
      try {
        const response = await authApi.post(`/jobReportCustomFilter`, request);
        if (response?.status === 200) {
            dispatch(setLoading(false));    
          dispatch(setJobReport(response?.data));
        //   dispatch(
        //     showSnackbar({
        //       message: response?.data?.msg || "Successfully Inserted",
        //       type: "success",
        //     })
        //   );
        }
      } catch (error) {
        dispatch(setLoading(false));
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
  export const FilterInvoiceReport = createAsyncThunk(
    "statusInvoiceReportFilterCustom/create",
    async (request, { dispatch }) => {
        dispatch(setLoading(true));
      try {
        const response = await authApi.post(`/statusInvoiceReportFilterCustom`, request);
        if (response?.status === 200) {
            dispatch(setLoading(false));    
          dispatch(setInvoiceReport(response?.data));
        //   dispatch(
        //     showSnackbar({
        //       message: response?.data?.msg || "Successfully Inserted",
        //       type: "success",
        //     })
        //   );
        }
      } catch (error) {
        dispatch(setLoading(false));
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
export const FilterLinguistReport = createAsyncThunk(
    "linguistInvoiceFilterCustom/create",
    async (request, { dispatch }) => {
        dispatch(setLoading(true));
      try {
        const response = await authApi.post(`/linguistInvoiceFilterCustom`, request);
        if (response?.status === 200) {
            dispatch(setLoading(false));    
          dispatch(setLinguistReport(response?.data));
        //   dispatch(
        //     showSnackbar({
        //       message: response?.data?.msg || "Successfully Inserted",
        //       type: "success",
        //     })
        //   );
        }
      } catch (error) {
        dispatch(setLoading(false));
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
export const MarginReportList = createAsyncThunk(
    "jobReportMargin",
    async (request, { dispatch }) => {
        dispatch(setLoading(true));
      try {
        const response = await authApi.post(`/jobReportMargin`, request);
        if (response?.status === 200) {
            dispatch(setLoading(false));    
          dispatch(setMarginReport(response?.data));
        //   dispatch(
        //     showSnackbar({
        //       message: response?.data?.msg || "Successfully Inserted",
        //       type: "success",
        //     })
        //   );
        }
      } catch (error) {
        dispatch(setLoading(false));
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
export const SingleInvoiceView = createAsyncThunk(
    "clientInvoiceViewOne",
    async (request, { dispatch }) => {
        dispatch(setLoading(true));
      try {
        const response = await authApi.get(`/clientInvoiceViewOne/${request}`);
        if (response?.status === 200) {
            dispatch(setLoading(false));    
          dispatch(setSingleClientInvoice(response?.data));
        //   dispatch(
        //     showSnackbar({
        //       message: response?.data?.msg || "Successfully Inserted",
        //       type: "success",
        //     })
        //   );
        }
      } catch (error) {
        dispatch(setLoading(false));
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
export const SingleInvoiceViewLinguist = createAsyncThunk(
    "invoiceViewOne",
    async (request, { dispatch }) => {
        dispatch(setLoading(true));
      try {
        const response = await authApi.get(`/invoiceViewOne/${request}`);
        if (response?.status === 200) {
            dispatch(setLoading(false));    
          dispatch(setSingleClientInvoiceLinguist(response?.data));
        //   dispatch(
        //     showSnackbar({
        //       message: response?.data?.msg || "Successfully Inserted",
        //       type: "success",
        //     })
        //   );
        }
      } catch (error) {
        dispatch(setLoading(false));
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
export const ClientInvoiceSetting = createAsyncThunk(
    "clientInvoiceSetting",
    async (request, { dispatch }) => {
        dispatch(setLoading(true));
      try {
        const response = await authApi.get(`/clientInvoiceSetting`);
        if (response?.status === 200) {
            dispatch(setLoading(false));    
          dispatch(setInvoiceSetting(response?.data));
        //   dispatch(
        //     showSnackbar({
        //       message: response?.data?.msg || "Successfully Inserted",
        //       type: "success",
        //     })
        //   );
        }
      } catch (error) {
        dispatch(setLoading(false));
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