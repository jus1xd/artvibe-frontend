import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { router } from "./router/router";
import { setupStore } from "./store/store";
import moment from "moment";
import 'moment/locale/ru';

const store = setupStore();
const container = document.getElementById("root");
const root = createRoot(container!);

moment.locale('ru');

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
