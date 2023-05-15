import { createSlice } from '@reduxjs/toolkit';
import { api } from 'services/api';

import { NewsState } from '../types';

const initialState: NewsState = {
  focusArticle: null
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setFocusArticle: (state, action) => {
      state.focusArticle = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.logoutUser.matchFulfilled, (state) => {
      state.focusArticle = null;
    });
  }
});

export const { setFocusArticle } = newsSlice.actions;

export default newsSlice.reducer;
