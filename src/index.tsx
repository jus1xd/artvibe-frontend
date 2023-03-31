import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { setupStore } from "./store/store";
import { router } from "./router/router";

const store = setupStore()
const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
