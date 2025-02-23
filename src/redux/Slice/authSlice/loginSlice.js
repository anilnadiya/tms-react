import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  emailVerify: null,
};

const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setloginUserData: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setemailVerify: (state, action) => {
      state.emailVerify = action.payload;
    },
  },
});

export const { setloginUserData, logout,setemailVerify } = loginSlice.actions;
export default loginSlice.reducer;
