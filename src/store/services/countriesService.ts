// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICountry } from "../../models/ICountry";

// Define a service using a base URL and expected endpoints
const baseUrl = process.env.REACT_APP_API_URL;

export const countriesApi = createApi({
  reducerPath: "countriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  tagTypes: ["Country"],
  endpoints: (builder) => ({
    getAllCountries: builder.query<ICountry[], string>({
      query: () => ({
        url: `api/countries`,
        method: "GET",
        mode: "cors",
      }),
      providesTags: (result) => ['Country']
    }),
    createCountry: builder.mutation<ICountry, ICountry>({
      query: (author) => ({
        url: `api/countries`,
        method: "POST",
        mode: "cors",
        format: "formdata",
        body: author,
      }),
      invalidatesTags: ['Country']
    }),
    updateCountry: builder.mutation<ICountry, ICountry>({
      query: (id) => ({
        url: `api/countries/${id}`,
        method: "PUT",
        mode: "cors",
        body: id,
      }),
      invalidatesTags: ['Country']
    }),
    deleteCountry: builder.mutation<ICountry, ICountry>({
      query: (id) => ({
        url: `api/countries/${id}`,
        method: "DELETE",
        mode: "cors",
        body: id,
      }),
      invalidatesTags: ['Country']
    }),
  }),
});
