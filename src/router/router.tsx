import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import About from "../pages/about";
import AdminAuthors from "../pages/admin/adminAuthors";
import AdminCountries from "../pages/admin/adminCountries";
import AdminPictures from "../pages/admin/adminPictures";
import Artists from "../pages/artists";
import Contacts from "../pages/contacts";
import Countries from "../pages/countries";
import Login from "../pages/login";
import NotFoundPage from "../pages/notfound";
import Register from "../pages/register";
import Show from "../pages/show";
import Start from "../pages/start";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Start />,
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
  {
    path: "/admin",
    element: <AdminAuthors />,
  },
  {
    path: "/admin/artists",
    element: <AdminAuthors />,
  },
  {
    path: "/admin/pictures",
    element: <AdminPictures />,
  },
  {
    path: "/admin/countries",
    element: <AdminCountries />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  }
]);
