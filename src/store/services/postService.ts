// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../../models/IUser";
import { IFriend } from "../../models/IFriend";
import { IPost } from "../../models/IPost";

// Define a service using a base URL and expected endpoints
const baseUrl = process.env.REACT_APP_API_URL;

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    createPost: builder.mutation<IPost, FormData>({
      query: (data) => ({
        url: `api/create-post`, // Подставьте правильный путь
        method: "POST",
        mode: "cors",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: builder.mutation<IPost, Object>({
      query: (body) => ({
        url: `api/delete-post`, // Подставьте правильный путь
        method: "DELETE",
        mode: "cors",
        body: body,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});
