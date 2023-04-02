import { combineReducers } from "redux";
import { authorsApi } from "./services/authorService";
import { authApi } from "./services/authService";
import { countriesApi } from "./services/countriesService";
import { picturesApi } from "./services/pictureService";
import authorsSlice from "./slices/authorsSlice";
import { authReducer } from "./slices/authSlice";

export const rootReducer = combineReducers({
  authors: authorsSlice.reducer,
  [authorsApi.reducerPath]: authorsApi.reducer,
  [picturesApi.reducerPath]: picturesApi.reducer,
  [countriesApi.reducerPath]: countriesApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  auth: authReducer,
});
