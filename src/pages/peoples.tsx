import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import Header from "../components/Header";
import { IUser } from "../models/IUser";

import avatar1 from "../assets/img/messenger/avatar1.png";

import jwt_decode from "jwt-decode";
import PeopleCard from "../components/PeopleCard";

import { io } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { IFriend } from "../models/IFriend";

import { userApi } from "../store/services/userService";
import { addFriend, setFriends } from "../store/slices/friendsSlice";
import { deletePeople } from "../store/slices/peoplesSlice";

const socket = io("http://localhost:5003");

const Peoples = () => {
  const dispatch = useAppDispatch();
  const friends = useAppSelector((state) => state.friends.friends);
  // массив всех людей
  const [dataPeoples, setDataPeoples] = useState<IUser[]>([]);
  const [dataFriends, setDataFriends] = useState<IUser[]>([]);

  // запрос на получение моих друзей
  const [getFriends] = userApi.useGetFriendsMutation();
  const [addToFriends] = userApi.useAddToFriendsMutation();
  const [removeFromFriends] = userApi.useRemoveFromFriendsMutation();

  // получить всех пользователей с сервера
  const getPeoples = userApi.useGetPeoplesQuery("");

  // получить токен из localStorage
  const token = localStorage.getItem("token");
  // @ts-ignore
  const userId: string = token ? jwt_decode(token).id : "";

  // form data для получения друзей
  const dataForGetFriendlist = new FormData();
  dataForGetFriendlist.append("userId", userId);

  // получение друзей при загрузке страницы
  useEffect(() => {
    if (getPeoples.data && getPeoples.data.length > 0) {
      if (friends.length <= 0) {
        getFriends(dataForGetFriendlist).then((res) => {
          // @ts-ignore
          setDataFriends(
            getPeoples
              .data!.filter((item: any) => item._id !== userId)
              .filter((item: any) =>
                // @ts-ignore
                res.data.some((friend: any) => friend._id === item._id)
              )
          );
          setDataPeoples(
            getPeoples
              .data!.filter((item: any) => item._id !== userId)
              .filter(
                (item: any) =>
                  // @ts-ignore
                  !res.data.some((friend: any) => friend._id === item._id)
              )
          );
        });
      } else {
        setDataFriends(
          getPeoples
            .data!.filter((item: any) => item._id !== userId)
            .filter((item: any) =>
              // @ts-ignore
              friends.some((friend: any) => friend._id === item._id)
            )
        );
        setDataPeoples(
          getPeoples
            .data!.filter((item: any) => item._id !== userId)
            .filter(
              (item: any) =>
                // @ts-ignore
                !friends.some((friend: any) => friend._id === item._id)
            )
        );
      }
    }
  }, [getPeoples.data]);

  // добавление в друзья WebSocket
  useEffect(() => {
    // Обработка события "friendAdded" от сервера
    if (dataPeoples.length > 0) {
      socket.on("friendAdded", (updatedUsers) => {
        if (userId === updatedUsers.currentUser._id) {
          setDataPeoples(
            dataPeoples.filter(
              (item) => item._id !== updatedUsers.friendUser._id
            )
          );
          setDataFriends([...dataFriends, updatedUsers.friendUser]);
        } else {
          setDataPeoples(
            dataPeoples.filter(
              (item) => item._id !== updatedUsers.currentUser._id
            )
          );
          setDataFriends([...dataFriends, updatedUsers.currentUser]);
        }
      });

      // Очистка обработчика события при размонтировании компонента
      return () => {
        socket.off("friendAdded");
      };
    }
  }, [dataPeoples]);

  // удаление из друзей WebSocket
  useEffect(() => {
    if (dataFriends.length > 0) {
      // Обработка события "friendRemoved" от сервера
      socket.on("friendRemoved", (updatedUsers) => {
        if (userId === updatedUsers.currentUser._id) {
          setDataFriends(
            dataFriends.filter(
              (item) => item._id !== updatedUsers.friendUser._id
            )
          );
          setDataPeoples([...dataPeoples, updatedUsers.friendUser]);
        } else {
          setDataFriends(
            dataFriends.filter(
              (item) => item._id !== updatedUsers.currentUser._id
            )
          );
          setDataPeoples([...dataPeoples, updatedUsers.currentUser]);
        }
      });

      // Очистка обработчика события при размонтировании компонента
      return () => {
        socket.off("friendRemoved");
      };
    }
  }, [dataFriends]);

  // добавление в друзья WebSocket
  const addToFriendsHandler = (
    dataForFriendsActions: FormData,
    peopleId: string
  ) => {
    addToFriends(dataForFriendsActions).then((res) => {
      socket.emit("friendAdded", { userId, peopleId });
    });
  };

  // удаление из друзей WebSocket
  const removeFromFriendsHandler = (
    dataForFriendsActions: FormData,
    peopleId: string
  ) => {
    removeFromFriends(dataForFriendsActions).then((res) => {
      socket.emit("friendRemoved", { userId, peopleId });
    });
  };

  return (
    <div className="messenger">
      <Header theme="light" />
      <Container>
        <div className="messenger-content w-full text-white mt-24">
          <h1 className="text-2xl font-semibold mt-10 mb-7">Люди</h1>
          <div className="flex flex-wrap">
            {dataPeoples && dataPeoples.length > 0 ? (
              dataPeoples.map((item: any) => (
                <PeopleCard
                  key={item._id!}
                  peopleId={item._id!}
                  avatar={avatar1}
                  clientId={userId}
                  isFriend={false}
                  isFriendLoading={getPeoples.isLoading}
                  addToFriendsHandler={addToFriendsHandler}
                  name={item.name}
                  email={item.email}
                />
              ))
            ) : (
              <div className="w-full h-10 flex items-center justify-center">
                <div className="text-[#ffffff80] text-lg mt-3">
                  Все люди у вас в друзьях
                </div>
              </div>
            )}
          </div>
          <h1 className="text-2xl font-semibold mt-10 mb-7">Друзья</h1>
          <div className="flex flex-wrap">
            {dataFriends &&
              dataFriends.length > 0 &&
              dataFriends.map((item) => (
                <PeopleCard
                  key={item._id!}
                  peopleId={item._id!}
                  avatar={avatar1}
                  clientId={userId}
                  isFriend={true}
                  isFriendLoading={getPeoples.isLoading}
                  removeFromFriendsHandler={removeFromFriendsHandler}
                  name={item.name}
                  email={""}
                />
              ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Peoples;
