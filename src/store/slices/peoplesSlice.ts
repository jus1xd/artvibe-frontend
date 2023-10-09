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
    editPeople: (state, action) => {
      state.peoples = state.peoples.map((people) => {
        if (people._id === action.payload._id) {
          people.isOnline = action.payload.isOnline;
        }
        return people;
      });
    },
    addPeople: (state, action) => {
      state.peoples.push(action.payload.friendUser);
    },
    deletePeople: (state, action) => {
      if (state.peoples) {
        state.peoples = state.peoples.filter(
          (friend) => friend._id !== action.payload._id
        );
      }
    },
  },
});

export const { setPeoples, editPeople, addPeople, deletePeople } =
  peoplesSlice.actions;
export default peoplesSlice;
