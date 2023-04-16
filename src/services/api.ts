import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Article } from "context/types";

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getNewsData: builder.query<Article[], void>({
      query: () => "get-news-data",
      transformResponse: (response: { data: Article[] }) => response.data,
    }),
  }),
});

export const { useGetNewsDataQuery } = newsApi;
