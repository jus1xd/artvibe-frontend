import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import logoLight from "../assets/img/logoLight.svg";
import logoDark from "../assets/img/logoDark.svg";

import Button from "./Button";
import Container from "./Container";
import { useActions } from "../hooks/actions";

type TProps = {
  theme?: "light" | "dark";
};

const Header: React.FC<TProps> = ({ theme }) => {
  const [menuActive, setMenuActive] = useState<boolean>(false);
  const token = localStorage.getItem("token");

  // @ts-ignore
  const userRole = token ? jwt_decode(token).roles : "guest";
  // @ts-ignore
  const userLogin = token ? jwt_decode(token).username : null;

  const navigate = useNavigate();

  const { logout } = useActions();

  const logoutHandler = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="mt-5 relative z-10">
      <Container>
        {theme === "light" ? (
          <div className="flex justify-between items-center h-[60px]">
            <NavLink to="/">
              <img src={logoLight} alt="" />
            </NavLink>
            <nav className="flex text-white">
              <NavLink to="/countries" className="ml-7 font-medium text-white">
                Страны
              </NavLink>
              <NavLink to="/show" className="ml-7 font-medium text-white">
                Выставки
              </NavLink>
              <NavLink to="/artists" className="ml-7 font-medium text-white">
                Художники
              </NavLink>
              <NavLink to="/about" className="ml-7 font-medium text-white">
                О нас
              </NavLink>
              <NavLink to="/contacts" className="ml-7 font-medium text-white">
                Контакты
              </NavLink>
            </nav>
            {token ? (
              userRole === "admin" ? (
                <NavLink to="/admin">
                  <Button type="secondary" size="md" text={userLogin} />
                </NavLink>
              ) : (
                <div
                  className="relative"
                  onClick={() => setMenuActive(!menuActive)}
                >
                  <Button type="secondary" size="md" text={userLogin} />
                  {menuActive && (
                    <div className="absolute z-10 top-10 bg-white rounded-3xl overflow-hidden w-full">
                      <div
                        onClick={logoutHandler}
                        className="p-1 bg-redpal-200 text-redpal-500 cursor-pointer text-center"
                      >
                        Выйти
                      </div>
                    </div>
                  )}
                </div>
              )
            ) : (
              <NavLink to="/login">
                <Button type="secondary" size="md" text="Войти" />
              </NavLink>
            )}
          </div>
        ) : (
          <div className="flex justify-between items-center h-[60px]">
            <NavLink to="/">
              <img src={logoDark} alt="" />
            </NavLink>
            <nav className="flex">
              <NavLink to="/countries" className="ml-7 font-medium text-title">
                Страны
              </NavLink>
              <NavLink to="/show" className="ml-7 font-medium text-title">
                Выставки
              </NavLink>
              <NavLink to="/artists" className="ml-7 font-medium text-title">
                Художники
              </NavLink>
              <NavLink to="/about" className="ml-7 font-medium text-title">
                О нас
              </NavLink>
              <NavLink to="/contacts" className="ml-7 font-medium text-title">
                Контакты
              </NavLink>
            </nav>
            {token ? (
              userRole === "admin" ? (
                <NavLink to="/admin">
                  <Button type="accent" size="md" text={userLogin} />
                </NavLink>
              ) : (
                <div className="relative" onClick={() => setMenuActive(!menuActive)}>
                  <Button type="primary" size="md" text={userLogin} />
                  {menuActive && (
                    <div className="absolute z-10 top-10 bg-white rounded-3xl overflow-hidden w-full">
                      <div
                        onClick={logoutHandler}
                        className="p-1 bg-redpal-200 text-redpal-500 cursor-pointer text-center"
                      >
                        Выйти
                      </div>
                    </div>
                  )}
                </div>
              )
            ) : (
              <NavLink to="/login">
                <Button type="primary" size="md" text="Войти" />
              </NavLink>
            )}
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;
