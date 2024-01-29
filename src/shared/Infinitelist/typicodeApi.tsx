import {createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const typicodeApi = createApi({
    reducerPath: "postApi",
    baseQuery: fetchBaseQuery({
      baseUrl: "https://jsonplaceholder.typicode.com/",
    }),
    endpoints: () => ({
    }),
  });
  