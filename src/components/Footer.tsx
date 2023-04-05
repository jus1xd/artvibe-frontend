import React from "react";
import { NavLink } from "react-router-dom";

import logoDark from "../assets/img/logoDark.svg";

import Container from "./Container";

type TProps = {
  theme?: "light";
};

const Footer: React.FC<TProps> = ({ theme }) => {
  return (
    <footer className="absolute bottom-[-150px] bg-[#fff] w-full left-0 mt-5 py-3 z-10">
      <Container>
        <div className="flex justify-between items-center h-[60px]">
          <NavLink className="flex items-center" to="/">
            <img src={logoDark} alt="" />
            <div className="text-sm text-center mt-2 text-title ml-5">
              Artvibe © 2023
            </div>
          </NavLink>
          <nav className="flex text-title">
            <NavLink to="/countries" className="ml-7 font-medium">
              Страны
            </NavLink>
            <NavLink to="/show" className="ml-7 font-medium">
              Выставки
            </NavLink>
            <NavLink to="/artists" className="ml-7 font-medium">
              Художники
            </NavLink>
            <NavLink to="/about" className="ml-7 font-medium">
              О нас
            </NavLink>
            <NavLink to="/contacts" className="ml-7 font-medium">
              Контакты
            </NavLink>
          </nav>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
