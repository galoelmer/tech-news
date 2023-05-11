import { createSlice } from "@reduxjs/toolkit";

import { NewsState } from "../types";

const initialState: NewsState = {
  focusArticleUrl: null,
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setFocusArticleUrl: (state, action) => {
      state.focusArticleUrl = action.payload;
    },
  },
});

export const { setFocusArticleUrl } = newsSlice.actions;

export const selectFocusArticleUrl = (state: { news: NewsState }) =>
  state.news.focusArticleUrl;

export default newsSlice.reducer;
