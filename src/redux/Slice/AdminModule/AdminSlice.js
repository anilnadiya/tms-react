import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    specialization: [],
    resource_position: [],
    resource_status: [],
    client_status: [],
    currency: [],
    currencyCode: [],
    dateFormate: [],
    decimalSeparator:[],
    language:[],
    memoQLanguage:[],
    property:[],
    propertyvalue:[],
    taxation:[],
    projectTypes:[],
    scoop:[],
    jobstatus:[],
    jobs:[],
    masterprice:[],
    roundingprice:[],
    childprice:[],
    getsinglechildprice:[],
    dropdownMasterPrice:[],
    dropdownMasterUnits:[],
    bankinfo:[],
    invoiceDue:[],
    invoiceSetting:[],
    singleInvoiceSetting:[],
    dropdownClient:[],
    langTrans:[],
    email:[],
    business:[],
    abbreviation:[],
    emailTemplate:[],
}


const AdminSlice = createSlice({
    name: "AdminSlice",
    initialState,
    reducers: {
        setSpecilizationList: (state, action) => ({
            ...state,
            specialization: action.payload
        }),
        setResourcePosition: (state, action) => ({
            ...state,
            resource_position: action.payload
        }),
        setResourceStatus: (state, action) => ({
            ...state,
            resource_status: action.payload
        }),
        setClientStatus: (state, action) => ({
            ...state,
            client_status: action.payload
        }),
        setCurrency: (state, action) => ({
            ...state,
            currency: action.payload
        }),
        setCurrencyCode: (state, action) => ({
            ...state,
            currencyCode: action.payload
        }),
        setDateFormate: (state, action) => ({
            ...state,
            dateFormate: action.payload
        }),
        setDecimalSeparator: (state, action) => ({
            ...state,
            decimalSeparator: action.payload
        }),
        setLanguage: (state, action) => ({
            ...state,
            language: action.payload
        }),
        setMemoQLanguage: (state, action) => ({
            ...state,
            memoQLanguage: action.payload
        }),
        setProperty: (state, action) => ({
            ...state,
            property: action.payload
        }),
        setPropertyValue: (state, action) => ({
            ...state,
            propertyvalue: action.payload
        }),
        setTaxation: (state, action) => ({
            ...state,
            taxation: action.payload
        }),
        setProjectTypes: (state, action) => ({
            ...state,
            projectTypes: action.payload
        }),
        setScoopStatus: (state, action) => ({
            ...state,
            scoop: action.payload
        }),
        setJobStatus: (state, action) => ({
            ...state,
            jobstatus: action.payload
        }),
        setJobs: (state, action) => ({
            ...state,
            jobs: action.payload
        }),
        setMasterPrice: (state, action) => ({
            ...state,
            masterprice: action.payload
        }),
        setRoundingPrice: (state, action) => ({
            ...state,
            roundingprice: action.payload
        }),
        setChildPrice: (state, action) => ({
            ...state,
            childprice: action.payload
        }),
        getSingleChildPrice: (state, action) => ({
            ...state,
            getsinglechildprice: action.payload
        }),
        setDropdownMasterPrice: (state, action) => ({
            ...state,
            dropdownMasterPrice: action.payload
        }),
        setDropdownMasterUnits: (state, action) => ({
            ...state,
            dropdownMasterUnits: action.payload
        }),
        setBankingInfo: (state, action) => ({
            ...state,
            bankinfo: action.payload
        }),
        setInvoiceDue: (state, action) => ({
            ...state,
            invoiceDue: action.payload
        }),
        setInvoiceSetting: (state, action) => ({
            ...state,
            invoiceSetting: action.payload
        }),
        getSingleInvoiceSetting: (state, action) => ({
            ...state,
            singleInvoiceSetting: action.payload
        }),
        setDropdownClient: (state, action) => ({
            ...state,
            dropdownClient: action.payload
        }),
        setLanguageTranslate: (state, action) => ({
            ...state,
            langTrans: action.payload
        }),
        setEmail: (state, action) => ({
            ...state,
            email: action.payload
        }),
        setBusinessUnit: (state, action) => ({
            ...state,
            business: action.payload
        }),
        setAbbreviation: (state, action) => ({
            ...state,
            abbreviation: action.payload
        }),
        setEmailTemplate: (state, action) => ({
            ...state,
            emailTemplate: action.payload
        }),
    }
})

export const {setSpecilizationList, setResourcePosition, setResourceStatus,setClientStatus,setCurrency,setCurrencyCode,setDateFormate, setDecimalSeparator,setLanguage, setMemoQLanguage,setProperty,setPropertyValue, setTaxation,setProjectTypes, setScoopStatus, setJobStatus, setJobs, setMasterPrice, setRoundingPrice, setChildPrice, getSingleChildPrice, setDropdownMasterPrice, setDropdownMasterUnits, setBankingInfo,setInvoiceDue,setInvoiceSetting,getSingleInvoiceSetting, setDropdownClient, setLanguageTranslate, setEmail, setBusinessUnit, setAbbreviation, setEmailTemplate} = AdminSlice.actions

export default AdminSlice.reducer;