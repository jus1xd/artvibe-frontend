// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../../models/IUser";

const token = localStorage.getItem("token")

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://artvibeapi.onrender.com/",
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    getAllUsers: builder.query<IUser[], string>({
      query: () => ({
        url: `api/users`,
        method: "GET",
        mode: "cors",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }),
      providesTags: (result) => ['Auth']
    }),
    createUser: builder.mutation<IUser, string>({
      query: (user) => ({
        url: `api/registration`,
        method: "POST",
        mode: "cors",
        body: user,
      }),
      invalidatesTags: ['Auth']
    }),
    loginUser: builder.mutation<IUser, string>({
      query: (user) => ({
        url: `api/login`,
        method: "POST",
        mode: "cors",
        body: user,
      }),
      invalidatesTags: ['Auth']
    }),
    updateUser: builder.mutation<IUser, IUser>({
      query: (id) => ({
        url: `api/users/${id}`,
        method: "PUT",
        mode: "cors",
        body: id,
      }),
      invalidatesTags: ['Auth']
    }),
    deleteUser: builder.mutation<IUser, string>({
      query: (id) => ({
        url: `api/users/${id}`,
        method: "DELETE",
        mode: "cors",
        body: id,
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }),
      invalidatesTags: ['Auth']
    }),
  }),
});
