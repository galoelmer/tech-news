import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { newsApi } from "services/api";
import newsReducer from "./reducers/news-reducer";
// import usersReducer from "./reducers/users-reducer";

export const store = configureStore({
  reducer: {
    [newsApi.reducerPath]: newsApi.reducer,
    news: newsReducer,
    // users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(newsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
