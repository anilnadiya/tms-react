import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    clientStatement: [],
    dropdownExternalUser: [],
    linguistStatement:[],
}


const StatementSlice = createSlice({
    name: "StatementSlice",
    initialState,
    reducers: {
        setClientStatement: (state, action) => ({
            ...state,
            clientStatement: action.payload
        }),
        setExternalUser: (state, action) => ({
            ...state,
            dropdownExternalUser: action.payload
        }),
        setLinguistStatement: (state, action) => ({
            ...state,
            linguistStatement: action.payload
        }),
    }
})

export const {setClientStatement,setExternalUser, setLinguistStatement} = StatementSlice.actions

export default StatementSlice.reducer;