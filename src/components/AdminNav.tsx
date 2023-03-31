import React from "react";
import { NavLink } from "react-router-dom";

const AdminNav = () => {
  return (
    <div className="min-w-[200px] h-max flex flex-col border border-inputBorder rounded-xl overflow-hidden transition-all">
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
        to={"admin/users"}
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
        to={"admin/models"}
        className="p-3 cursor-pointer hover:bg-dark hover:text-white"
      >
        3D модели
      </NavLink>
    </div>
  );
};

export default AdminNav;
