import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import logoLight from "../assets/img/logoLight.svg";
import logoDark from "../assets/img/logoDark.svg";
import messagesDark from "../assets/img/header/messagesDark.svg";
import messagesLight from "../assets/img/header/messagesLight.svg";
import peoplesLight from "../assets/img/header/peoplesLight.svg";
import peoplesDark from "../assets/img/header/peoplesDark.svg";

import Button from "./Button";
import Container from "./Container";
import { useActions } from "../hooks/actions";
import { socket } from "../hooks/socket";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  addFriend,
  addMessage,
  deleteFriend,
  setFriends,
} from "../store/slices/friendsSlice";
import { userApi } from "../store/services/userService";
import Toast from "./Toast";
import { IMessage } from "../models/IMessage";

type TProps = {
  theme?: "light" | "dark";
};

const Header: React.FC<TProps> = ({ theme }) => {
  const dispatch = useAppDispatch();
  const [menuActive, setMenuActive] = useState<boolean>(false);
  const [newMessages, setNewMessages] = useState<IMessage[]>([]);
  const token = localStorage.getItem("token");

  const [getFriends] = userApi.useGetFriendsMutation();
  const friends = useAppSelector((state) => state.friends.friends);

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

  const navLinksList = [
    {
      title: "Страны",
      link: "/countries",
    },
    {
      title: "Выставки",
      link: "/show",
    },
    {
      title: "Художники",
      link: "/artists",
    },
    {
      title: "О нас",
      link: "/about",
    },
    {
      title: "Контакты",
      link: "/contacts",
    },
  ];

  // функция на получение друзей
  const getFriendsAndSave = () => {
    getFriends(userId).then((res: any) => {
      dispatch(setFriends(res.data));
    });
  };

  // получение сообщения WebSocket
  useEffect(() => {
    socket.on("sendMessage", (message: any) => {
      if (
        message.friendId === userId ||
        message.senderId === userId
        // &&
        // (message.friendId === friendId || message.senderId === friendId)
      ) {
        dispatch(addMessage(message));
        if (message.senderId !== userId) {
          setNewMessages((prev) => [...prev, message]);
        }
      }
    });

    return () => {
      socket.off("sendMessage");
    };
  }, []);

  // если нас добавили в друзья WebSocket
  useEffect(() => {
    // Обработка события "friendAdded" от сервера
    socket.on("friendAdded", (updatedUsers) => {
      if (updatedUsers.friendUser._id === userId) {
        getFriendsAndSave();
        dispatch(addFriend(updatedUsers.currentUser));
      }
    });

    // Очистка обработчика события при размонтировании компонента
    return () => {
      socket.off("friendAdded");
    };
  }, []);

  // если нас удалили из друзей WebSocket
  useEffect(() => {
    // Обработка события "friendAdded" от сервера
    socket.on("friendRemoved", (updatedUsers) => {
      if (updatedUsers.friendUser._id === userId) {
        getFriendsAndSave();
        dispatch(deleteFriend(updatedUsers.currentUser));
      }
    });

    // Очистка обработчика события при размонтировании компонента
    return () => {
      socket.off("friendRemoved");
    };
  }, []);

  return (
    <>
      <header className="mt-2">
        <Container>
          {theme === "light" ? (
            <div className="relative z-50 flex justify-between items-center h-[60px]">
              <NavLink to="/">
                <img src={logoLight} alt="" />
              </NavLink>
              <nav className="text-white hidden sm:flex">
                {navLinksList.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.link}
                    className={`ml-4 font-medium text-sm md:text-base md:ml-7 text-white`}
                  >
                    {item.title}
                  </NavLink>
                ))}
              </nav>
              {token ? (
                userRole === "admin" ? (
                  <div className="flex items-center justify-center">
                    <NavLink
                      to="/peoples"
                      className="mr-7 font-medium text-title"
                    >
                      <img src={peoplesLight} alt="Люди" />
                    </NavLink>
                    <NavLink to="/im" className="mr-7 font-medium text-title">
                      <img src={messagesLight} alt="Мессенджер" />
                    </NavLink>
                    <NavLink to="/admin">
                      <Button type="secondary" size="md" text={userLogin} />
                    </NavLink>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <NavLink
                      to="/peoples"
                      className="mr-7 font-medium text-title"
                    >
                      <img src={peoplesLight} alt="Люди" />
                    </NavLink>
                    <NavLink to="/im" className="mr-7 font-medium text-title">
                      <img src={messagesLight} alt="Мессенджер" />
                    </NavLink>
                    <div
                      className="relative min-w-[65px] flex justify-end"
                      onClick={() => setMenuActive(!menuActive)}
                    >
                      <Button type="secondary" size="md" text={userLogin} />
                      <div
                        className={`${
                          menuActive ? "h-[64px]" : "h-0"
                        } transition-all absolute z-10 top-10 rounded-xl overflow-hidden w-auto`}
                      >
                        <NavLink to={`/${userId}`}>
                          <Button type="secondary" size="sm" text={"Профиль"} />
                        </NavLink>
                        <div
                          onClick={logoutHandler}
                          className="px-2 py-1 text-redpal-400 cursor-pointer text-center"
                        >
                          <Button type="secondary" size="sm" text={"Выйти"} />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              ) : (
                <NavLink to="/login">
                  <Button type="secondary" size="md" text="Войти" />
                </NavLink>
              )}
            </div>
          ) : (
            <div className="relative z-50 flex justify-between items-center h-[60px]">
              <NavLink to="/">
                <img src={logoDark} alt="" />
              </NavLink>
              <nav className="hidden sm:flex">
                {navLinksList.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.link}
                    className={`ml-4 font-medium text-sm md:text-base md:ml-7 text-title`}
                  >
                    {item.title}
                  </NavLink>
                ))}
              </nav>
              {token ? (
                userRole === "admin" ? (
                  <div className="flex items-center justify-center">
                    <NavLink
                      to="/peoples"
                      className="mr-7 font-medium text-title"
                    >
                      <img src={peoplesDark} alt="Люди" />
                    </NavLink>
                    <NavLink to="/im" className="mr-7 font-medium text-title">
                      <img src={messagesDark} alt="Мессенджер" />
                    </NavLink>
                    <NavLink to="/admin">
                      <Button type="accent" size="md" text={userLogin} />
                    </NavLink>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <NavLink
                      to="/peoples"
                      className="mr-7 font-medium text-title"
                    >
                      <img src={peoplesDark} alt="Люди" />
                    </NavLink>
                    <NavLink to="/im" className="mr-7 font-medium text-title">
                      <img src={messagesDark} alt="Мессенджер" />
                    </NavLink>
                    <div
                      className="relative"
                      onClick={() => setMenuActive(!menuActive)}
                    >
                      <Button type="primary" size="md" text={userLogin} />
                      <div
                        className={`${
                          menuActive ? "h-[67px]" : "h-0"
                        } transition-all absolute z-10 top-10 rounded-xl overflow-hidden w-auto`}
                      >
                        <NavLink to={`/${userId}`}>
                          <Button type="primary" size="sm" text={"Профиль"} />
                        </NavLink>
                        <div
                          onClick={logoutHandler}
                          className="px-2 py-1 cursor-pointer text-center"
                        >
                          <Button type="primary" size="sm" text={"Выйти"} />
                        </div>
                      </div>
                    </div>
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
        <div className="hidden sm:block toaster absolute left-5 bottom-0 max-h-4/5 overflow-y-hidden">
          {newMessages.length > 0 &&
            newMessages.map((message) => (
              <Toast
                key={message._id}
                id={message.senderId}
                avatar={message.senderAvatar}
                name={message.senderName}
                message={message.text}
              />
            ))}
        </div>
      </header>
    </>
  );
};

export default Header;
