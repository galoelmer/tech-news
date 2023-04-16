import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { InitialState } from "../types";

const initialState: InitialState = {
  articles: [],
  loading: false,
  maxLimit: false,
  offset: 0,
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    increaseNewsDataOffset: (state) => {
      state.offset += 12;
    },
  },
});

export const { increaseNewsDataOffset } = newsSlice.actions;

export default newsSlice.reducer;
