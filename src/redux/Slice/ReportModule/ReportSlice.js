import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filterscoopReport: [],
    filterjobsReport: [],
    filterInvoiceReport: [],
    filterLinguistReport:[],
    margin_report: [],
    client_invoice_view:[],
    linguist_invoice_view:[],
    show_invoice_setting: [],
}

const ReportSlice = createSlice({
    name: "ReportSlice",
    initialState,
    reducers: {
        setScoopReport: (state, action) => ({
            ...state,
            filterscoopReport: action.payload
        }),
        setJobReport: (state, action) => ({
            ...state,
            filterjobsReport: action.payload
        }),
        setInvoiceReport: (state, action) => ({
            ...state,
            filterInvoiceReport: action.payload
        }),
        setLinguistReport: (state, action) => ({
            ...state,
            filterLinguistReport: action.payload
        }),
        setMarginReport: (state, action) => ({
            ...state,
            margin_report: action.payload
        }),
        setSingleClientInvoice: (state, action) => ({
            ...state,
            client_invoice_view: action.payload
        }),
        setSingleClientInvoiceLinguist: (state, action) => ({
            ...state,
            linguist_invoice_view: action.payload
        }),
        setInvoiceSetting: (state, action) => ({
            ...state,
            show_invoice_setting: action.payload
        }),
    }
})

export const { setScoopReport, setJobReport, setInvoiceReport, setLinguistReport, setMarginReport, setSingleClientInvoice, setInvoiceSetting, setSingleClientInvoiceLinguist } = ReportSlice.actions;

export default ReportSlice.reducer;