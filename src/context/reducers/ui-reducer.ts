import { createSlice } from "@reduxjs/toolkit";

import { UiState } from "../types";

const initialState: UiState = {
  dialog: {
    isOpen: false,
    title: "",
    content: undefined,
    action: undefined,
  },
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
  },
});

export default uiSlice.reducer;

export const { openDialog, closeDialog } = uiSlice.actions;

export const selectDialogState = (state: { ui: UiState }) => state.ui.dialog;
