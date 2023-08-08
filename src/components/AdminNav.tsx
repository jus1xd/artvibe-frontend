import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useActions } from "../hooks/actions";

const AdminNav = () => {
  const navigate = useNavigate();

  const { logout } = useActions();

  const logoutHandler = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="mb-3 w-full h-max flex flex-col">
      <div className="mb-3 h-max flex flex-col border border-inputBorder rounded-xl overflow-hidden transition-all">
        <NavLink
          to={"/admin/pictures"}
          className="p-3 cursor-pointer hover:bg-dark hover:text-white"
        >
          Картины
        </NavLink>
        <NavLink
          to={"/admin/artists"}
          className="p-3 cursor-pointer hover:bg-dark hover:text-white"
        >
          Художники
        </NavLink>
        <NavLink
          to={"/admin/users"}
          className="p-3 cursor-pointer hover:bg-dark hover:text-white"
        >
          Пользователи
        </NavLink>
        <NavLink
          to={"/admin/countries"}
          className="p-3 cursor-pointer hover:bg-dark hover:text-white"
        >
          Страны
        </NavLink>
        <NavLink
          to={"/admin/models"}
          className="p-3 cursor-pointer hover:bg-dark hover:text-white"
        >
          3D модели
        </NavLink>
      </div>
      <div className="bg-white  w-full">
        <div
          onClick={logoutHandler}
          className="p-2 rounded-2xl bg-redpal-100 hover:bg-redpal-200 transition-colors text-redpal-500 cursor-pointer text-center"
        >
          Выйти
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
