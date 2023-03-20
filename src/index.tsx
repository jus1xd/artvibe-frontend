import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Countries from "./pages/countries";
import Show from "./pages/show";
import Artists from "./pages/artists";
import About from "./pages/about";
import Contacts from "./pages/contacts";
import Login from "./pages/login";
import Register from "./pages/register";

// application start point

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/countries",
    element: <Countries />,
  },
  {
    path: "/show",
    element: <Show />,
  },
  {
    path: "/artists",
    element: <Artists />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contacts",
    element: <Contacts />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<RouterProvider router={router} />);
