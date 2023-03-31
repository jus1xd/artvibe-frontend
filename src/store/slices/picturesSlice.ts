import { createSlice } from "@reduxjs/toolkit";
import { IPicture } from "../../models/IPicture";

export type TPictures = {
  pictures: IPicture[];
  isLoading: boolean;
  error: string;
};

const initialState: TPictures = {
  pictures: [],
  isLoading: false,
  error: "",
};

const picturesSlice = createSlice({
  name: "pictures",
  initialState,
  reducers: {},
  extraReducers: {},
});

export const {} = picturesSlice.actions;
export default picturesSlice;
