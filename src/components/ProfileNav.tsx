import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useActions } from "../hooks/actions";
import jwt_decode from "jwt-decode";

// icons

import profileIcon from "../assets/img/navigation/profile.svg";
import messengerIcon from "../assets/img/navigation/messenger.svg";
import friendsIcon from "../assets/img/navigation/friends.svg";
import communityIcon from "../assets/img/navigation/community.svg";
import logoutIcon from "../assets/img/navigation/logout.svg";

const ProfileNav = () => {
  const navigate = useNavigate();

  // получить userId из токена
  const token = localStorage.getItem("token");
  // @ts-ignore
  const userId = token ? jwt_decode(token).id : null;

  const { logout } = useActions();

  const logoutHandler = () => {
    logout();
    navigate("/");
  };

  const Pages = [
    {
      link: `/${userId}`,
      text: "Мой профиль",
      icon: profileIcon,
    },
    {
      link: `/im`,
      text: "Мессенджер",
      icon: messengerIcon,
    },
    {
      link: `/peoples`,
      text: "Мои друзья",
      icon: friendsIcon,
    },
    {
      link: `/community`,
      text: "Мои сообщества",
      icon: communityIcon,
    },
  ];

  const Links = () => {
    return Pages.map((page) => {
      return (
        <NavLink
          key={page.link}
          to={page.link}
          className="flex items-center mb-1 py-2 px-3 cursor-pointer hover:bg-darkBlueGray transition-all rounded-xl"
        >
          <div className="mr-2">
            <img className="w-6" src={page.icon} alt={page.text} />
          </div>
          <div className="mr-2">{page.text}</div>
        </NavLink>
      );
    });
  };

  return (
    <div className="min-w-[200px] w-[200px] text-white mb-3 h-max flex flex-col">
      <div className="mb-3 h-max flex flex-col border border-inputBorder transition-all">
        {Links()}
        <div
          onClick={logoutHandler}
          className="flex items-center mb-1 py-2 px-3 cursor-pointer hover:bg-[#ff21212c] transition-colors rounded-xl text-redpal-500 "
        >
          <div className="mr-2">
            <img className="w-5" src={logoutIcon} alt="Logout" />
          </div>
          <div className="mr-2">Выйти</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileNav;
