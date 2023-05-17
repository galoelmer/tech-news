import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from 'services/api';

import { DialogState, UiState } from '../types';

const initialState = {
  dialog: {
    isOpen: false,
    title: '',
    content: undefined,
    action: undefined
  },
  snackbar: {
    isOpen: false,
    message: '',
    keyId: undefined
  },
  tabBarHeight: null,
  previousScreen: null
} as UiState;

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openDialog: (state, { payload }: PayloadAction<DialogState>) => {
      state.dialog = {
        isOpen: true,
        title: payload.title,
        content: payload.content,
        action: payload.action
      };
    },
    closeDialog: (state) => {
      state.dialog = {
        isOpen: false,
        title: '',
        content: undefined,
        action: undefined
      };
    },
    openSnackbar: (state, { payload }) => {
      state.snackbar = {
        isOpen: true,
        message: payload.message,
        keyId: payload?.keyId
      };
    },
    closeSnackbar: (state) => {
      state.snackbar = initialState.snackbar;
    },
    setButtonTabBarHeight: (state, { payload }) => {
      state.tabBarHeight = payload;
    },
    setPreviousScreen: (state, { payload }: { payload: string }) => {
      state.previousScreen = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.logoutUser.matchFulfilled, (state) => {
      state.previousScreen = null;
    });
  }
});

export default uiSlice.reducer;

export const {
  openDialog,
  closeDialog,
  openSnackbar,
  closeSnackbar,
  setButtonTabBarHeight,
  setPreviousScreen
} = uiSlice.actions;

export const selectDialogState = (state: { ui: UiState }) => state.ui.dialog;
