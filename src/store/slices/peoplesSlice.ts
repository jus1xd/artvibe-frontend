import { createSlice } from "@reduxjs/toolkit";
import { IMessage } from "../../models/IMessage";
import { IUser } from "../../models/IUser";

export type TPeoples = {
  peoples: Array<IUser>;
  isLoading: boolean;
  error: string;
};

const initialState: TPeoples = {
  peoples: [],
  isLoading: false,
  error: "",
};

const peoplesSlice = createSlice({
  name: "peoples",
  initialState,
  reducers: {
    setPeoples: (state, action) => {
      state.peoples = action.payload;
    },
    addPeople: (state, action) => {
      state.peoples.push(action.payload.friendUser);
    },
    deletePeople: (state, action) => {
      if (state.peoples) {
        // @ts-ignore
        state.peoples = state.peoples.filter(
          (friend) => friend._id !== action.payload._id
        );
      }
    },
  },
});

export const { setPeoples, addPeople, deletePeople } = peoplesSlice.actions;
export default peoplesSlice;
