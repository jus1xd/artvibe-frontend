// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPicture } from "../../models/IPicture";

// Define a service using a base URL and expected endpoints
const baseUrl = process.env.REACT_APP_API_URL;

export const picturesApi = createApi({
  reducerPath: "picturesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  tagTypes: ["Picture"],
  endpoints: (builder) => ({
    getAllPictures: builder.query<IPicture[], string>({
      query: () => ({
        url: `api/pictures`,
        method: "GET",
        mode: "cors",
      }),
      providesTags: (result) => ["Picture"],
    }),
    createPicture: builder.mutation<IPicture, IPicture>({
      query: (picture) => ({
        url: `api/pictures`,
        method: "POST",
        mode: "cors",
        body: picture,
      }),
      invalidatesTags: ["Picture"],
    }),
    updatePicture: builder.mutation<IPicture, IPicture>({
      query: (id) => ({
        url: `api/pictures/${id}`,
        method: "PUT",
        mode: "cors",
        body: id,
      }),
      invalidatesTags: ["Picture"],
    }),
    deletePicture: builder.mutation<IPicture, IPicture>({
      query: (id) => ({
        url: `api/pictures/${id}`,
        method: "DELETE",
        mode: "cors",
        body: id,
      }),
      invalidatesTags: ["Picture"],
    }),
  }),
});
