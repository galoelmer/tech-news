import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as SecureStore from "expo-secure-store";

import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { Article } from "context/types";

export interface AuthResponse {
  token: string;
  userName: string;
  userId: string;
  favorites: string[] | number[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: async (headers, { endpoint }) => {
      const token = await SecureStore.getItemAsync("token");
      const { getUserData } = api.endpoints;
      console.log("TCL ▶︎ file: api.ts:26 ▶︎ HEADER_TOKEN:", token); //TODO: remove this

      const shouldIncludeToken = [getUserData.name].includes(endpoint);
      if (shouldIncludeToken && token) {
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
    getUserData: builder.query<Exclude<AuthResponse, "token">, void>({
      queryFn: async (_arg, queryApi, _extraOptions, baseQuery) => {
        const token = await SecureStore.getItemAsync("token");
        if (!token) {
          queryApi.abort();
        }

        const result = await baseQuery("get-user-data");
        return result.data
          ? { data: result.data as Exclude<AuthResponse, "token"> }
          : { error: result.error as FetchBaseQueryError };
      },
    }),
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
} = api;
