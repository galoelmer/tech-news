import { createSlice } from "@reduxjs/toolkit";

import { api } from "services/api";
import { Article } from "../types";

type AuthState = {
  token: string | null;
  isAuth: boolean;
  useName: string;
  userId: string;
  favorites: Article[];
  randomNameCreated: boolean;
};

const initialState: AuthState = {
  token: null,
  isAuth: false,
  useName: "",
  userId: "",
  favorites: [],
  randomNameCreated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
        state.isAuth = true;
        state.userId = payload.userId;
        state.useName = payload.userName;
        state.favorites = payload.favorites;
        state.randomNameCreated = payload.randomNameCreated;
      }
    );
  },
});

export default authSlice.reducer;

export const selectCurrentUser = (state: { auth: AuthState }) => state.auth;
