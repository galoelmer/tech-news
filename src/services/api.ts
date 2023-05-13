import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as SecureStore from "expo-secure-store";

import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { Article } from "context/types";
import type { AuthResponse, LoginRequest, AddBookmarkRequest } from "./types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: async (headers, { endpoint }) => {
      const token = await SecureStore.getItemAsync("token");
      // const { signupUser } = api.endpoints;
      // const shouldIncludeToken = ![signupUser.name].includes(endpoint);
      // if (shouldIncludeToken && token) {
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getNewsData: builder.query<Article[], void>({
      query: () => "get-news-data",
      transformResponse: (response: { data: Article[] }) => response.data,
    }),
    getUserData: builder.query<{}, void>({
      queryFn: async (_arg, queryApi, _extraOptions, baseQuery) => {
        const token = await SecureStore.getItemAsync("token");
        if (!token) {
          queryApi.abort();
        }

        const result = await baseQuery("get-user-data");
        return result.data
          ? { data: {} }
          : { error: result.error as FetchBaseQueryError };
      },
    }),
    getUserBookmarks: builder.query<Article[], void>({
      query: () => "get-user-bookmarks",
      transformResponse: (response: { data: Article[] }) => response.data,
    }),
    addBookmark: builder.mutation<void, AddBookmarkRequest>({
      query: ({ articleId, article }) => ({
        url: `add-bookmark`,
        method: "POST",
        body: { articleId, article },
      }),
      async onQueryStarted(
        { articleId, article },
        { dispatch, queryFulfilled }
      ) {
        const patchNewsData = dispatch(
          api.util.updateQueryData("getNewsData", undefined, (draft) => {
            const article = draft.find((article) => article.id === articleId);
            if (article) {
              article.isBookmarked = true;
            }
          })
        );
        const patchUserBookmark = dispatch(
          api.util.updateQueryData("getUserBookmarks", undefined, (draft) => {
            const updatedArticle = { ...article, isBookmarked: true };
            draft.push(updatedArticle);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchNewsData.undo();
          patchUserBookmark.undo();
        }
      },
      transformErrorResponse: (response) => response.data,
    }),
    removeBookmark: builder.mutation<void, Omit<AddBookmarkRequest, "article">>(
      {
        query: (body) => ({
          url: `remove-bookmark`,
          method: "POST",
          body,
        }),
        async onQueryStarted({ articleId }, { dispatch, queryFulfilled }) {
          const patchNewsData = dispatch(
            api.util.updateQueryData("getNewsData", undefined, (draft) => {
              const article = draft.find((article) => article.id === articleId);
              if (article) {
                article.isBookmarked = false;
              }
            })
          );
          const patchUserBookmark = dispatch(
            api.util.updateQueryData("getUserBookmarks", undefined, (draft) => {
              const index = draft.findIndex(
                (article) => article.id === articleId
              );
              if (index !== -1) {
                draft.splice(index, 1);
              }
            })
          );

          try {
            await queryFulfilled;
          } catch {
            patchNewsData.undo();
            patchUserBookmark.undo();
          }
        },
        transformErrorResponse: (response) => response.data,
      }
    ),
    loginUser: builder.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({ url: "login", method: "POST", body }),
      onQueryStarted: async (_body, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          await SecureStore.setItemAsync("token", data.token);
        } catch (error) {}
      },
      transformErrorResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetNewsDataQuery,
  useGetUserDataQuery,
  useLoginUserMutation,
  useGetUserBookmarksQuery,
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
} = api;
