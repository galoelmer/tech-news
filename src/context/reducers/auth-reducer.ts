import { createSlice } from '@reduxjs/toolkit';
import { api } from 'services/api';

import { AuthState } from '../types';

const initialState: AuthState = {
  isAuth: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.loginUser.matchFulfilled, (state) => {
        state.isAuth = true;
      })
      .addMatcher(api.endpoints.getUserData.matchFulfilled, (state) => {
        state.isAuth = true;
      })
      .addMatcher(api.endpoints.logoutUser.matchFulfilled, (state) => {
        state.isAuth = false;
      });
  }
});

export default authSlice.reducer;

export const selectCurrentUser = (state: { auth: AuthState }) => state.auth;
