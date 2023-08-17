// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAuthor } from "../../models/IAuthor";

// Define a service using a base URL and expected endpoints
const baseUrl = process.env.REACT_APP_API_URL;

export const authorsApi = createApi({
  reducerPath: "authorsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
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
