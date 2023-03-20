import React from "react";
import { NavLink } from "react-router-dom";

import logoLight from "../assets/img/logoLight.svg";
import logoDark from "../assets/img/logoDark.svg";

import Button from "./Button";
import Container from "./Container";

type TProps = {
  theme?: "light" | "dark";
};

const Header: React.FC<TProps> = ({ theme }) => {
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
            <NavLink to="/login">
              <Button type="secondary" size="md" text="Войти" />
            </NavLink>
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
            <NavLink to="/login">
              <Button type="primary" size="md" text="Войти" />
            </NavLink>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;
