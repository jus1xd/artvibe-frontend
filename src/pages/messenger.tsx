import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import Header from "../components/Header";

import avatar1 from "../assets/img/messenger/avatar1.png";

import jwt_decode from "jwt-decode";

import DialogCard from "../components/messenger/DialogCard";
import Conversation from "./conversation";
import { userApi } from "../store/services/userService";
import Spinner from "../components/SpinnerLoader";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setFriends } from "../store/slices/friendsSlice";
import { io } from "socket.io-client";

const socket = io("http://localhost:5003");

const Messenger = () => {
  const dispatch = useAppDispatch();
  const [lastMessage, setLastMessage] = useState<string>("");

  // получить токен из localStorage
  const token = localStorage.getItem("token");
  // @ts-ignore
  const userId = token ? jwt_decode(token).id : null;

  // form data для получения друзей
  const dataForGetFriendlist = new FormData();
  dataForGetFriendlist.append("userId", userId);

  // получить id друга из url
  const params = useParams();
  const friendId = params.id || "";

  const [dataDialogs, setDataDialogs] = useState<any[]>([]);
  const [dataDialogsLoading, setDataDialogsLoading] = useState<boolean>(true);

  const [getFriends] = userApi.useGetFriendsMutation();
  const friends = useAppSelector((state) => state.friends.friends);

  // получение друзей при загрузке страницы
  useEffect(() => {
    if (friends.length <= 0) {
      getFriends(dataForGetFriendlist).then((res) => {
        // @ts-ignore
        setDataDialogs(res.data);
        // @ts-ignore
        dispatch(setFriends(res.data));
        setDataDialogsLoading(false);
      });
    } else {
      setDataDialogs(friends);
      setDataDialogsLoading(false);
    }
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (message) => {
      console.log(message);
    });

    return () => {
      socket.off("sendMessage");
    };
  }, []);

  // генерация аватарок
  function generateRandomColor() {
    const minBrightness = 60; // Минимальная яркость (0-255), ближе к 0 - темнее
    const maxBrightness = 90; // Максимальная яркость (0-255), ближе к 255 - светлее

    const randomColor = () => Math.floor(Math.random() * 256); // Генерация случайного числа от 0 до 255

    let color;
    do {
      color = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
    } while (
      // Проверка, чтобы цвет был не слишком темным и не слишком светлым
      parseInt(color.slice(4)) < minBrightness ||
      parseInt(color.slice(4)) > maxBrightness
    );

    return color;
  }

  return (
    <div className="messenger">
      <Header theme="light" />
      <Container>
        <div className="messenger-content w-full text-white flex justify-between mt-16">
          {/* dialogs */}
          <div className="rounded-xl bg-[#20232B] w-1/4 mr-7 min-w-[200px] min-h-[20rem]">
            {/* search */}
            <div className="flex items-center justify-between px-4 pt-3">
              <input
                placeholder="Найти.."
                className="placeholder:!text-[#ffffff80] w-full text-sm cursor-pointer bg-[#ffffff10] outline-none  rounded-md px-3 py-2"
              />
            </div>
            <div className="flex flex-col cursor-pointer justify-center items-center w-full p-2">
              {dataDialogsLoading ? (
                <div className="mt-7">
                  <Spinner size={25} />
                </div>
              ) : dataDialogs.length > 0 ? (
                dataDialogs.map((item) => (
                  <DialogCard
                    key={item._id}
                    idOfFriend={item._id}
                    avatar={generateRandomColor()}
                    name={item.name}
                    message={
                      item.messages &&
                      item.messages.length > 0 &&
                      item.messages[item.messages.length - 1].text
                    }
                  />
                ))
              ) : (
                <div className="text-[#ffffff80] text-sm mt-7">
                  У вас пока нет друзей
                </div>
              )}
            </div>
          </div>
          {/* conversation */}
          {friendId ? (
            <Conversation friendId={friendId} avatar={generateRandomColor()} setLastMessage={setLastMessage} />
          ) : (
            <div className="rounded-xl bg-[#20232B] w-3/4 h-[600px] overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-[#ffffff80] text-md mt-7">
                  Выберите диалог
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Messenger;
