// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAuthor } from "../../models/IAuthor";

const BASE_URL = process.env.REACT_APP_BASE_URL || "https://artvibeapi.onrender.com/";

export const authorsApi = createApi({
  reducerPath: "authorsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Author"],
  endpoints: (builder) => ({
    getAllAuthors: builder.query<IAuthor[], string>({
      query: () => ({
        url: `api/authors`,
        method: "GET",
        mode: "cors",
      }),
      providesTags: (result) => ["Author"],
    }),
    createAuthor: builder.mutation<IAuthor, IAuthor>({
      query: (author) => ({
        url: `api/authors`,
        method: "POST",
        mode: "cors",
        format: "formdata",
        body: author,
      }),
      invalidatesTags: ["Author"],
    }),
    updateAuthor: builder.mutation<IAuthor, IAuthor>({
      query: (id) => ({
        url: `api/authors/${id}`,
        method: "PUT",
        mode: "cors",
        body: id,
      }),
      invalidatesTags: ["Author"],
    }),
    deleteAuthor: builder.mutation<IAuthor, IAuthor>({
      query: (id) => ({
        url: `api/authors/${id}`,
        method: "DELETE",
        mode: "cors",
        body: id,
      }),
      invalidatesTags: ["Author"],
    }),
  }),
});
