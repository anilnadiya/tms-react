import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  List: [],
  internalResource: {},
  profile_number: "",
  resourceStatusList: [],
  resourcePosition: [],
  menuePermission: [],
};

const internalResourceSlice = createSlice({
  name: "internalResourceSlice",
  initialState,
  reducers: {
    setInternalResource: (state, action) => ({
      ...state,
      List: action.payload,
    }),
    setSingleInternalResource: (state, action) => ({
      ...state,
      internalResource: action.payload,
    }),
    setProfileNumber: (state, action) => ({
      ...state,
      profile_number: action.payload,
    }),
    setResourceStatusList: (state, action) => ({
      ...state,
      resourceStatusList: action.payload,
    }),
    setResourcePositionList: (state, action) => ({
      ...state,
      resourcePosition: action.payload,
    }),
    setTreeMenueList: (state, action) => ({
      ...state,
      menuePermission: action.payload,
    }),
  },
});

export const {
  setInternalResource,
  setSingleInternalResource,
  setProfileNumber,
  setResourceStatusList,
  setResourcePositionList,
  setTreeMenueList,
} = internalResourceSlice.actions;

export default internalResourceSlice.reducer;
