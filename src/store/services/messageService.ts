// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IMessage } from "../../models/IMessage";

// Define a service using a base URL and expected endpoints
const baseUrl = process.env.REACT_APP_API_URL;

type TData = {
  clientId: string;
  friendId: string;
  messageText?: string;
};

export const messagesApi = createApi({
  reducerPath: "messagesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  tagTypes: ["Message"],
  endpoints: (builder) => ({
    getMessages: builder.mutation<IMessage[], TData>({
      query: (data) => ({
        url: `api/conversation/`,
        method: "POST",
        mode: "cors",
        body: {
          id: data.clientId,
          friendId: data.friendId,
        },
      }),
      invalidatesTags: ["Message"],
    }),
    sendMessage: builder.mutation<IMessage[], TData>({
      query: (data) => ({
        url: `api/send-message/${data.clientId}`,
        method: "POST",
        mode: "cors",
        body: {
          friendId: data.friendId,
          messageText: data.messageText,
        },
      }),
      invalidatesTags: ["Message"],
    }),
  }),
});
