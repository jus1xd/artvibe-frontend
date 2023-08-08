import { createSlice } from "@reduxjs/toolkit";
import { IMessage } from "../../models/IMessage";
import { act } from "@react-three/fiber";

export type TMessages = {
  dialogs: {
    _id: string;
    idOfFriend: string;
    messages: IMessage[];
  }[];
};

const initialState: TMessages = {
  dialogs: [],
};

const messagesSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      const { friendId } = action.payload.length > 0 ? action.payload[0] : "";

      const dialog = state.dialogs.find(
        (dialog) => dialog.idOfFriend === friendId
      );

      if (dialog) {
        dialog.messages.push(action.payload);
      } else {
        state.dialogs.push({
          _id: "232323fdsfdsf",
          idOfFriend: friendId,
          messages: action.payload,
        });
      }
    },
  },
  extraReducers: {},
});

export const { setMessages } = messagesSlice.actions;
export default messagesSlice;
