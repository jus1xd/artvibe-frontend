import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./pages/start";
import Messenger from "./pages/messenger";
import ProtectedRoute from "./components/ProtectedRoute";
import Peoples from "./pages/peoples";
import News from "./pages/news";
import Profile from "./pages/profile";
import Countries from "./pages/countries";
import Show from "./pages/show";
import Artist from "./pages/artist";
import Artists from "./pages/artists";
import About from "./pages/about";
import Contacts from "./pages/contacts";
import Picture from "./pages/picture";
import Country from "./pages/country";
import Timeline from "./pages/timeline";
import Colors from "./pages/colors";
import Login from "./pages/login";
import Register from "./pages/register";
import Admin from "./pages/admin";
import AdminAuthors from "./pages/admin/adminAuthors";
import AdminPictures from "./pages/admin/adminPictures";
import AdminCountries from "./pages/admin/adminCountries";
import AdminUsers from "./pages/admin/adminUsers";
import AdminModels from "./pages/admin/adminModels";
import NotFoundPage from "./pages/notfound";
import ErrorPage from "./pages/error";
import ProfileEdit from "./pages/profile/profileEdit";
import { socket } from "./hooks/socket";
import Header from "./components/Header";

const App: React.FC = () => {
  const [theme, setTheme] = useState<string>("dark");
  const [onlineUsers, setOnlineUsers] = useState<number>(0);

  // онлайн статусы пользователей WebSocket
  socket.on("onlineUsers", (usersCount: number) => {
    setOnlineUsers(usersCount);
  });

  return (
    <>
      <Header theme={theme} onlineUsers={onlineUsers} />
      <Routes>
        <Route path="/" element={<Start setTheme={setTheme} />} />
        {/* social media app */}
        <Route
          path="/news/*"
          element={
            <ProtectedRoute
              notAuthSecure
              children={<News setTheme={setTheme} />}
            />
          }
        />
        <Route
          errorElement={<ErrorPage setTheme={setTheme} />}
          path="/im/*"
          element={
            <ProtectedRoute
              notAuthSecure
              children={<Messenger setTheme={setTheme} />}
            />
          }
        />
        <Route
          errorElement={<ErrorPage setTheme={setTheme} />}
          path="/im/:id/*"
          element={
            <ProtectedRoute
              notAuthSecure
              children={<Messenger setTheme={setTheme} />}
            />
          }
        />
        <Route
          errorElement={<ErrorPage setTheme={setTheme} />}
          path="/peoples/*"
          element={
            <ProtectedRoute
              notAuthSecure
              children={<Peoples setTheme={setTheme} />}
            />
          }
        />
        <Route
          errorElement={<ErrorPage setTheme={setTheme} />}
          path="/edit/:id/*"
          element={
            <ProtectedRoute notAuthSecure>
              <ProfileEdit />
            </ProtectedRoute>
          }
        />

        <Route
          errorElement={<ErrorPage setTheme={setTheme} />}
          path="/:id/*"
          element={
            <ProtectedRoute
              notAuthSecure
              children={<Profile setTheme={setTheme} />}
            />
          }
        />
        <Route
          errorElement={<ErrorPage setTheme={setTheme} />}
          path="/peoples/*"
          element={
            <ProtectedRoute
              notAuthSecure
              children={<Peoples setTheme={setTheme} />}
            />
          }
        />
        {/* error routes  */}
        <Route
          path="/404/*"
          element={
            <ProtectedRoute children={<NotFoundPage setTheme={setTheme} />} />
          }
        />
        {/* social media app */}
        <Route
          path="/countries/*"
          element={<Countries setTheme={setTheme} />}
        />
        <Route path="/show/*" element={<Show setTheme={setTheme} />} />
        <Route path="/artists/*" element={<Artists setTheme={setTheme} />} />
        <Route path="/about/*" element={<About setTheme={setTheme} />} />
        <Route path="/contacts/*" element={<Contacts setTheme={setTheme} />} />
        <Route
          path="/show/timeline/*"
          element={<Timeline setTheme={setTheme} />}
        />
        <Route path="/show/colors/*" element={<Colors setTheme={setTheme} />} />
        <Route path="/artist/:id/*" element={<Artist setTheme={setTheme} />} />
        <Route
          path="/picture/:id/*"
          element={<Picture setTheme={setTheme} />}
        />
        <Route
          path="/country/:id/*"
          element={<Country setTheme={setTheme} />}
        />
        {/* auth app  */}
        <Route
          path="/login/*"
          element={
            <ProtectedRoute
              authSecure
              children={<Login setTheme={setTheme} />}
            />
          }
        />
        <Route
          path="/register/*"
          element={
            <ProtectedRoute
              authSecure
              children={<Register setTheme={setTheme} />}
            />
          }
        />
        {/* admin app  */}
        <Route
          path="/admin/*"
          element={<ProtectedRoute children={<AdminAuthors />} />}
        />
        <Route
          path="/admin/artists/*"
          element={<ProtectedRoute children={<AdminAuthors />} />}
        />
        <Route
          path="/admin/pictures/*"
          element={<ProtectedRoute children={<AdminPictures />} />}
        />
        <Route
          path="/admin/countries/*"
          element={<ProtectedRoute children={<AdminCountries />} />}
        />
        <Route
          path="/admin/users/*"
          element={<ProtectedRoute children={<AdminUsers />} />}
        />
        <Route
          path="/admin/models/*"
          element={<ProtectedRoute children={<AdminModels />} />}
        />
      </Routes>
    </>
  );
};

export default App;
