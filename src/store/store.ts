import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authorsApi } from "./services/authorService";
import { countriesApi } from "./services/countriesService";
import { picturesApi } from "./services/pictureService";
import authorsSlice from "./slices/authorsSlice";
// ...

const rootReducer = combineReducers({
  authors: authorsSlice.reducer,
  [authorsApi.reducerPath]: authorsApi.reducer,
  [picturesApi.reducerPath]: picturesApi.reducer,
  [countriesApi.reducerPath]: countriesApi.reducer,
}) 

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authorsApi.middleware, picturesApi.middleware, countriesApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

