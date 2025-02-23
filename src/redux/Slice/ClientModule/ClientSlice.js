import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    clientAccount: [],
    savedlogs: [],
    singleClientAccount: [],
    numberAscending: [],
    clients: [],
    clientStepperData: [],
    client_status: [],
    country:[],
    profile_number:[],
    client_contact: [],
    taxname: [],
    client_payment: [],
    singleClientStep1: [],
    client_contact_list: [],
    client_payment_list: [],
    client_login_detail_list: [],
    specialization_list: [],
    master_price_list: [],
    child_price_list: [],
    languages_dropdown_list: [],
    customer_price_list: [],
    single_price_data: [],
    client_login_list: [],
    client_view_direct_data: [],
    client_view_direct_contact: [],

}

const ClientSlice = createSlice({
    name: "ClientSlice",
    initialState,
    reducers: {
        setClientAccount: (state, action) => ({
            ...state,
            clientAccount: action.payload
        }),
        setLogs: (state, action) => ({
            ...state,
            savedlogs: action.payload
        }),
        setSingleClientAccount: (state, action) => ({
            ...state,
            singleClientAccount: action.payload
        }),
        setNumber: (state, action) => ({
            ...state,
        numberAscending: action.payload
        }),
        setClients: (state, action) => ({
            ...state,
        clients: action.payload
        }),
        setClientSteppers: (state, action) => ({
            ...state,
        clientStepperData: action.payload
        }),
        setClientStatus: (state, action) => ({
            ...state,
        client_status: action.payload
        }),
        setCountries: (state, action) => ({
            ...state,
        country: action.payload
        }),
        setClientNumber: (state, action) => ({
            ...state,
        profile_number: action.payload
        }),
        setClientContact: (state, action) => ({
            ...state,
        client_contact: action.payload
        }),
        setTaxdDropdown: (state, action) => ({
            ...state,
        taxname: action.payload
        }),
        setClientPayment: (state, action) => ({
            ...state,
        client_payment: action.payload
        }),
        getSingleClient: (state, action) => ({
            ...state,
        singleClientStep1: action.payload
        }),
        setClientContactList: (state, action) => ({
            ...state,
        client_contact_list: action.payload
        }),
        setClientPaymentList: (state, action) => ({
            ...state,
        client_payment_list: action.payload
        }),
        setClientLoginDetailList: (state, action) => ({
            ...state,
        client_login_detail_list: action.payload
        }),
        setSpecializationdDropdown: (state, action) => ({
            ...state,
        specialization_list: action.payload
        }),
        setMasterPriceList: (state, action) => ({
            ...state,
        master_price_list: action.payload
        }),
        setChildPriceList: (state, action) => ({
            ...state,
        child_price_list: action.payload
        }),
        setLanguagesDropdown: (state, action) => ({
            ...state,
        languages_dropdown_list: action.payload
        }),
        setCustomerPriceList: (state, action) => ({
            ...state,
        customer_price_list: action.payload
        }),
        getSingleClientPrice: (state, action) => ({
            ...state,
        single_price_data: action.payload
        }),
        setClientLoginList: (state, action) => ({
            ...state,
        client_login_list: action.payload
        }),
        
        setViewDirectContact: (state, action) => ({
            ...state,
        client_view_direct_contact: action.payload
        }),
        setViewDirectData: (state, action) => ({
            ...state,
        client_view_direct_data: action.payload
        }),
    }
})

export const {setClientAccount, setLogs, setSingleClientAccount, setNumber, setClients, setClientSteppers, setClientStatus, setCountries, setClientNumber,setClientContact, setTaxdDropdown, setClientPayment, getSingleClient, setClientContactList, setClientPaymentList,setClientLoginDetailList, setSpecializationdDropdown,setMasterPriceList,setChildPriceList,setLanguagesDropdown,setCustomerPriceList, getSingleClientPrice, setClientLoginList, setViewDirectData, setViewDirectContact} = ClientSlice.actions

export default ClientSlice.reducer;