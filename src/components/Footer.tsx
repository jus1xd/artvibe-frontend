import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import Container from "./Container";
import { useActions } from "../hooks/actions";

import jwt_decode from "jwt-decode";

import logoLight from "../assets/img/logoLight.svg";
import logoDark from "../assets/img/logoDark.svg";
import messagesDark from "../assets/img/header/messagesDark.svg";
import messagesLight from "../assets/img/header/messagesLight.svg";
import peoplesLight from "../assets/img/header/peoplesLight.svg";
import peoplesDark from "../assets/img/header/peoplesDark.svg";
import Button from "./Button";

type TProps = {
  theme?: "light";
};

const Footer: React.FC<TProps> = ({ theme }) => {
  const [menuActive, setMenuActive] = useState<boolean>(false);
  const token = localStorage.getItem("token");

  // @ts-ignore
  const userRole = token ? jwt_decode(token).roles : "guest";
  // @ts-ignore
  const userLogin = token ? jwt_decode(token).username : null;
  // @ts-ignore
  const userId = token ? jwt_decode(token).id : null;

  const navigate = useNavigate();

  const { logout } = useActions();

  const logoutHandler = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="mt-5 relative z-10">
      <Container>
        <div className="flex justify-between items-center px-3 py-1 rounded-full mx-auto mb-2 w-max text-accent bg-accentOpacity">
          Artvibe © 2023
        </div>
      </Container>
    </header>
  );
};

export default Footer;
