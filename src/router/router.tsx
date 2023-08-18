import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import About from "../pages/about";
import AdminAuthors from "../pages/admin/adminAuthors";
import AdminCountries from "../pages/admin/adminCountries";
import AdminPictures from "../pages/admin/adminPictures";
import AdminUsers from "../pages/admin/adminUsers";
import Artists from "../pages/artists";
import Contacts from "../pages/contacts";
import Countries from "../pages/countries";
import Login from "../pages/login";
import NotFoundPage from "../pages/notfound";
import Register from "../pages/register";
import Show from "../pages/show";
import Start from "../pages/start";
import Picture from "../pages/picture";
import Artist from "../pages/artist";
import Country from "../pages/country";
import Colors from "../pages/colors";
import Timeline from "../pages/timeline";
import AdminModels from "../pages/admin/adminModels";
import Messenger from "../pages/messenger";
import Peoples from "../pages/peoples";
import Profile from "../pages/profile";

export const router = createBrowserRouter([
  {
    path: "/countries",
    element: <Countries />,
  },
  {
    path: "/show",
    element: <Show />,
  },
  {
    path: "/im",
    element: (
      <ProtectedRoute notAuthSecure>
        <Messenger />
      </ProtectedRoute>
    ),
  },
  {
    path: "/im/:id",
    element: (
      <ProtectedRoute notAuthSecure>
        <Messenger />
      </ProtectedRoute>
    ),
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
    path: "/peoples",
    element: (
      <ProtectedRoute notAuthSecure>
        <Peoples />
      </ProtectedRoute>
    ),
  },
  {
    path: "/picture/:id",
    element: <Picture />,
  },
  {
    path: "/artist/:id",
    element: <Artist />,
  },
  {
    path: "/show/colors",
    element: <Colors />,
  },
  {
    path: "/show/timeline",
    element: <Timeline />,
  },
  {
    path: "/country/:id",
    element: <Country />,
  },
  {
    path: "/login",
    element: (
      <ProtectedRoute authSecure>
        <Login />
      </ProtectedRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <ProtectedRoute authSecure>
        <Register />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminAuthors />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/artists",
    element: (
      <ProtectedRoute>
        <AdminAuthors />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/pictures",
    element: (
      <ProtectedRoute>
        <AdminPictures />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/countries",
    element: (
      <ProtectedRoute>
        <AdminCountries />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/users",
    element: (
      <ProtectedRoute>
        <AdminUsers />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/models",
    element: (
      <ProtectedRoute>
        <AdminModels />
      </ProtectedRoute>
    ),
  },
  {
    path: "/:id",
    element: <Profile />,
  },
  {
    path: "/",
    element: <Start />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
