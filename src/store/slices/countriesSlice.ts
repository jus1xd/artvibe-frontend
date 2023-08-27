import { createSlice } from "@reduxjs/toolkit";
import { IAuthor } from "../../models/IAuthor";


export type TCountries = {
  authors: IAuthor[];
  isLoading: boolean;
  error: string;
};

const initialState: TCountries = {
  authors: [],
  isLoading: false,
  error: "",
};

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {},
});

export const {} = countriesSlice.actions;
export default countriesSlice;
