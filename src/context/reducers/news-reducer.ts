import { createSlice } from "@reduxjs/toolkit";

import { NewsState } from "../types";

const initialState: NewsState = {
  focusArticle: {
    id: null,
    url: null,
    article: null,
    isBookmarked: false,
  },
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setFocusArticleUrl: (state, action) => {
      state.focusArticle = action.payload;
    },
  },
});

export const { setFocusArticleUrl } = newsSlice.actions;

export const selectFocusArticleUrl = (state: { news: NewsState }) =>
  state.news.focusArticle;

export default newsSlice.reducer;
