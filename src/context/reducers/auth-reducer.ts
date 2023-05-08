import { createSlice } from "@reduxjs/toolkit";

import { api } from "services/api";

import { AuthState } from "../types";

const initialState: AuthState = {
  isAuth: false,
  userInfo: {
    userId: "",
    userName: undefined,
    favorites: [],
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.isAuth = false;
      state.userInfo = {
        userId: "",
        userName: undefined,
        favorites: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        api.endpoints.loginUser.matchFulfilled,
        (state, { payload }) => {
          state.isAuth = true;
          state.userInfo.userName = payload.userName;
          state.userInfo.userId = payload.userId;
          state.userInfo.favorites = payload.favorites;
        }
      )
      .addMatcher(
        api.endpoints.getUserData.matchFulfilled,
        (state, { payload }) => {
          state.isAuth = true;
          state.userInfo.userId = payload.userId;
          state.userInfo.userName = payload.userName;
          state.userInfo.favorites = payload.favorites;
        }
      );
  },
});

export default authSlice.reducer;

export const { logoutUser } = authSlice.actions;

export const selectCurrentUser = (state: { auth: AuthState }) => state.auth;
