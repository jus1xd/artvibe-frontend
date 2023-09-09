import { createSlice } from "@reduxjs/toolkit";
import { IMessage } from "../../models/IMessage";
import { IUser } from "../../models/IUser";
import { IPost } from "../../models/IPost";

export type TPosts = {
  peoples: [
    {
      userId: string;
      posts: IPost[];
    }
  ];
  isLoading: boolean;
  error: string;
};

const initialState: TPosts = {
  peoples: [
    {
      userId: "",
      posts: [],
    },
  ],
  isLoading: false,
  error: "",
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.peoples.push(action.payload);
    },
    addPost: (state, action) => {
      console.log(action.payload)
      state.peoples.map((people) => {
        if (people.userId === action.payload.userId) {
          people.posts.push(action.payload.post);
        } else {
          state.peoples.push({
            userId: action.payload.userId,
            posts: [action.payload.post],
          });
        }
      });
    },
  },
});

export const {setPosts, addPost} = postsSlice.actions;
export default postsSlice;
