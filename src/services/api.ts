import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Article } from "context/types";
import { RootState } from "context/store";

export interface AuthResponse {
  token: string;
  userName: string;
  userId: string;
  favorites: Article[];
  randomNameCreated: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      // const token = (localStorage.getItem("token") as string) || "";
      const token = (getState() as RootState).auth.token;
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
    loginUser: builder.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({ url: "login", method: "POST", body }),
      transformErrorResponse: (response) => response.data,
    }),
  }),
});

export const { useGetNewsDataQuery, useLoginUserMutation } = api;
