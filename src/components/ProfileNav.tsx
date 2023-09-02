import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useActions } from "../hooks/actions";
import jwt_decode from "jwt-decode";

// icons

import newsIcon from "../assets/img/navigation/news.svg";
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
      link: `/news`,
      text: "Новости",
      icon: newsIcon,
    },
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
    // {
    //   link: `/community`,
    //   text: "Мои сообщества",
    //   icon: communityIcon,
    // },
  ];

  const Links = () => {
    return Pages.map((page) => {
      return (
        <NavLink
          key={page.link}
          to={page.link}
          className={({ isActive }) =>
            `flex items-center mr-2 sm:mr-0 sm:mb-1 py-2 px-3 ${
              isActive && "bg-darkBlueGray"
            } cursor-pointer hover:bg-darkBlueGray transition-all rounded-xl`
          }
        >
          <div className="sm:mr-2">
            <img className="w-[30px]" src={page.icon} alt={page.text} />
          </div>
          <div className="mr-2 mb-[-2px] hidden sm:block">{page.text}</div>
        </NavLink>
      );
    });
  };

  return (
    <div className="sm:mr-8 fixed sm:z-[0] z-[999] bottom-0 left-0 sm:static">
      <div className="pt-2 pb-6 sm:py-0 bg-darkBackground w-[100vw] justify-center sm:static sm:min-w-[200px] sm:w-[200px] text-white sm:mb-3 h-max flex sm:flex-col">
        <div className="sm:mb-3 h-max flex sm:flex-col border border-inputBorder transition-all">
          {Links()}
          <div
            onClick={logoutHandler}
            className="flex items-center sm:mb-1 py-2 px-3 cursor-pointer hover:bg-[#ff21212c] transition-colors rounded-xl text-redpal-500 "
          >
            <div className="sm:mr-2">
              <img className="min-w-[30px]" src={logoutIcon} alt="Logout" />
            </div>
            <div className="mr-2 hidden sm:block">Выйти</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileNav;
