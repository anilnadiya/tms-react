// src/redux/snackbarSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  message: '',
  type: 'info', // Can be 'success', 'error', 'warning', 'info'
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar: (state, action) => {
      state.open = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    hideSnackbar: (state) => {
      state.open = false;
      state.message = '';
      state.type = 'info';
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
