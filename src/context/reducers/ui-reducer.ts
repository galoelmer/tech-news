import { createSlice } from "@reduxjs/toolkit";

import { UiState } from "../types";

const initialState: UiState = {
  dialog: {
    isOpen: false,
    title: "",
    content: undefined,
    action: undefined,
  },
  snackbar: {
    isOpen: false,
    message: "",
  },
  tabBarHeight: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openDialog: (state, { payload }) => {
      state.dialog = {
        isOpen: true,
        title: payload.title,
        content: payload.content,
        action: payload.action,
      };
    },
    closeDialog: (state) => {
      state.dialog = {
        isOpen: false,
        title: "",
        content: undefined,
        action: undefined,
      };
    },
    openSnackbar: (state, { payload }) => {
      state.snackbar = {
        isOpen: true,
        message: payload,
      };
    },
    closeSnackbar: (state) => {
      state.snackbar = {
        isOpen: false,
        message: "",
      };
    },
    setButtonTabBarHeight: (state, { payload }) => {
      state.tabBarHeight = payload;
    },
  },
});

export default uiSlice.reducer;

export const {
  openDialog,
  closeDialog,
  openSnackbar,
  closeSnackbar,
  setButtonTabBarHeight,
} = uiSlice.actions;

export const selectDialogState = (state: { ui: UiState }) => state.ui.dialog;
