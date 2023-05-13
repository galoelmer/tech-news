import { createSlice } from "@reduxjs/toolkit";

import { api } from "services/api";

import { AuthState } from "../types";

const initialState: AuthState = {
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.loginUser.matchFulfilled, (state) => {
        state.isAuth = true;
      })
      .addMatcher(api.endpoints.getUserData.matchFulfilled, (state) => {
        state.isAuth = true;
      });
  },
});

export default authSlice.reducer;

export const { logoutUser } = authSlice.actions;

export const selectCurrentUser = (state: { auth: AuthState }) => state.auth;
