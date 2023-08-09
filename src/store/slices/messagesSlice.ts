import { createSlice } from "@reduxjs/toolkit";
import { IMessage } from "../../models/IMessage";
import { act } from "@react-three/fiber";

export type TMessages = {
  dialogs: {
    _id: string;
    isDeprecated: boolean;
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

      const dialog = state.dialogs.find((dialog) => dialog._id === friendId);

      if (dialog) {
        dialog.messages.push(action.payload);
      } else {
        state.dialogs.push({
          _id: friendId,
          isDeprecated: false,
          messages: action.payload,
        });
      }
    },
    setMessagesDeprecated: (state, action) => {
      const { friendId } = action.payload.length > 0 ? action.payload[0] : "";

      const dialog = state.dialogs.find((dialog) => dialog._id === friendId);

      if (dialog) {
        dialog.isDeprecated = true;
      }
    },
  },
  extraReducers: {},
});

export const { setMessages, setMessagesDeprecated } = messagesSlice.actions;
export default messagesSlice;
