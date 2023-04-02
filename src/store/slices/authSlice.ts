import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TUsers = {
  token: string;
  isLoading: boolean;
  error: string;
};

const initialState: TUsers = {
  // @ts-ignore
  token: localStorage.getItem("token") | "",
  isLoading: false,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register(state, action: PayloadAction<{ token: string }>) {
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    login(state, action: PayloadAction<{ token: string }>) {
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    logout(state) {
      state.token = "";
      localStorage.removeItem("token");
    },
  },
  extraReducers: {
    // [useGetAuthorsQuery.fulfilled]: (state, action) => {},
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;

export default authSlice;
