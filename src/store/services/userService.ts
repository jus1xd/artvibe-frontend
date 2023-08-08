// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../../models/IUser";
import { IFriend } from "../../models/IFriend";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5003",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getPeoples: builder.query<IUser[], string>({
      query: () => ({
        url: `api/peoples`,
        method: "GET",
        mode: "cors",
      }),
      // providesTags: ["User"],
    }),
    getFriends: builder.mutation<IFriend[], FormData>({
      query: (id) => ({
        url: `api/friends`, // Подставьте правильный путь
        method: "POST",
        body: id,
        mode: "cors",
      }),
      invalidatesTags: ["User"],
    }),
    addToFriends: builder.mutation<IUser, Object>({
      query: (data) => ({
        url: `api/add-friend`,
        method: "POST",
        mode: "cors",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    removeFromFriends: builder.mutation<IUser, Object>({
      query: (data) => ({
        url: `api/remove-friend`,
        method: "DELETE",
        mode: "cors",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});
