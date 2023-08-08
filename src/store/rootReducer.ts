import { combineReducers } from "redux";
import { authorsApi } from "./services/authorService";
import { authApi } from "./services/authService";
import { countriesApi } from "./services/countriesService";
import { picturesApi } from "./services/pictureService";
import authorsSlice from "./slices/authorsSlice";
import { authReducer } from "./slices/authSlice";
import { userApi } from "./services/userService";
import { messagesApi } from "./services/messageService";
import messagesSlice from "./slices/messagesSlice";
import friendsSlice from "./slices/friendsSlice";

export const rootReducer = combineReducers({
  authors: authorsSlice.reducer,
  messages: messagesSlice.reducer,
  friends: friendsSlice.reducer,
  [authorsApi.reducerPath]: authorsApi.reducer,
  [picturesApi.reducerPath]: picturesApi.reducer,
  [countriesApi.reducerPath]: countriesApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [messagesApi.reducerPath]: messagesApi.reducer,
  auth: authReducer,
});
