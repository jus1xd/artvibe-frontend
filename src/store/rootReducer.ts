import { combineReducers } from "redux";
import { authorsApi } from "./services/authorService";
import { authApi } from "./services/authService";
import { countriesApi } from "./services/countriesService";
import { picturesApi } from "./services/pictureService";
import authorsSlice from "./slices/authorsSlice";
import { authReducer } from "./slices/authSlice";
import { userApi } from "./services/userService";
import { messagesApi } from "./services/messageService";
// import messagesSlice from "./slices/messagesSlice";
import friendsSlice from "./slices/friendsSlice";
import { postApi } from "./services/postService";
import postsSlice from "./slices/postsSlice";

export const rootReducer = combineReducers({
  authors: authorsSlice.reducer,
  friends: friendsSlice.reducer,
  posts: postsSlice.reducer,
  [authorsApi.reducerPath]: authorsApi.reducer,
  [picturesApi.reducerPath]: picturesApi.reducer,
  [countriesApi.reducerPath]: countriesApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [messagesApi.reducerPath]: messagesApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
  auth: authReducer,
});
