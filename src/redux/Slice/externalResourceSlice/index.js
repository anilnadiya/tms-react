import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  List: [],
  externalResource: {},
  profile_number: "",
  resourceStatusList: [],
  resourcePosition: [],
  menuePermission: [],
  contactExternalResource: [],
  propertyExternalResource: [],
};

const externalResourceSlice = createSlice({
  name: "externalResourceSlice",
  initialState,
  reducers: {
    setExternalResource: (state, action) => ({
      ...state,
      List: action.payload,
    }),
    setSingleExternalResource: (state, action) => ({
      ...state,
      externalResource: action.payload,
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
    setContactExternalResource: (state, action) => ({
      ...state,
      contactExternalResource: action.payload,
    }),
    setPropertyExternalResource: (state, action) => ({
      ...state,
      propertyExternalResource: action.payload,
    }),
  },
});

export const {
  setExternalResource,
  setSingleExternalResource,
  setProfileNumber,
  setResourceStatusList,
  setResourcePositionList,
  setTreeMenueList,
  setContactExternalResource,
  setPropertyExternalResource,
} = externalResourceSlice.actions;

export default externalResourceSlice.reducer;
