import { createSlice } from "@reduxjs/toolkit";
import { IMessage } from "../../models/IMessage";
import { IUser } from "../../models/IUser";
import { IFriend } from "../../models/IFriend";
import jwt_decode from "jwt-decode";

// получить токен из localStorage
const token = localStorage.getItem("token");
// @ts-ignore
const userId = token ? jwt_decode(token).id : null;

export type TFriends = {
  friends: Array<IFriend>;
  isDeprecated: boolean;
  isLoading: boolean;
  error: string;
};

const initialState: TFriends = {
  friends: [],
  isDeprecated: false,
  isLoading: false,
  error: "",
};

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    setFriends: (state, action) => {
      state.friends = action.payload;
    },
    addFriend: (state, action) => {
      state.friends.push(action.payload);
    },
    setMessages: (state, action) => {
      const { friendId } = action.payload.length > 0 ? action.payload[0] : "";

      const dialog = state.friends.find((dialog) => dialog._id === friendId);

      if (dialog) {
        dialog.messages.push(action.payload);
      }
    },
    addMessage: (state, action) => {
      const { friendId, senderId } = action.payload;

      if (userId === friendId) {
        const dialog = state.friends.find((dialog) => dialog._id === senderId);
        if (dialog) {
          dialog.messages.push(action.payload);
        }
      } else {
        const dialog = state.friends.find((dialog) => dialog._id === friendId);
        if (dialog) {
          dialog.messages.push(action.payload);
        }
      }
    },
    deleteFriend: (state, action) => {
      if (state.friends) {
        state.friends = state.friends.filter(
          (friend) => friend._id !== action.payload._id
        );
      }
    },
  },
  extraReducers: {},
});

export const { setFriends, setMessages, addFriend, addMessage, deleteFriend } =
  friendsSlice.actions;
export default friendsSlice;
