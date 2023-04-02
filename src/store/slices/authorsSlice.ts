import { createSlice } from "@reduxjs/toolkit";
import { IAuthor } from "../../models/IAuthor";


export type TAuthors = {
  authors: IAuthor[];
  isLoading: boolean;
  error: string;
};

const initialState: TAuthors = {
  authors: [],
  isLoading: false,
  error: "",
};

const authorsSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {},
  extraReducers: {
    // [useGetAuthorsQuery.fulfilled]: (state, action) => {},
  },
});

// export const {} = authorsSlice.actions;
export default authorsSlice;
