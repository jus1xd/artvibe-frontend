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
import ErrorPage from "../pages/error";
import News from "../pages/news";
import ProfileEdit from "../pages/profile/profileEdit";
import App from "../app";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <App />,
  },
]);
