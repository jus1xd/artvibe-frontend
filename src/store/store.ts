import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { authorsApi } from "./services/authorService";
import { authApi } from "./services/authService";
import { countriesApi } from "./services/countriesService";
import { picturesApi } from "./services/pictureService";
import { userApi } from "./services/userService";
import { messagesApi } from "./services/messageService";
import { postApi } from "./services/postService";

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authorsApi.middleware,
        picturesApi.middleware,
        countriesApi.middleware,
        userApi.middleware,
        authApi.middleware,
        messagesApi.middleware,
        postApi.middleware
      ),
    devTools: false,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
