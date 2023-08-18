import { useEffect, useState } from "react";
import Container from "../components/Container";
import Header from "../components/Header";

import jwt_decode from "jwt-decode";
import PeopleCard from "../components/PeopleCard";

import { io } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { IFriend } from "../models/IFriend";

import { userApi } from "../store/services/userService";
import { addFriend, deleteFriend } from "../store/slices/friendsSlice";
import ProfileNav from "../components/ProfileNav";

// Define a service using a base URL and expected endpoints
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5003";

const socket = io(baseUrl);

const Peoples = () => {
  const dispatch = useAppDispatch();
  const friends = useAppSelector((state) => state.friends.friends);
  // массив всех людей
  const [dataPeoples, setDataPeoples] = useState<IFriend[]>([]);
  const [dataFriends, setDataFriends] = useState<IFriend[]>([]);

  // запрос на получение моих друзей
  const [getFriends] = userApi.useGetFriendsMutation();
  const [addToFriends] = userApi.useAddToFriendsMutation();
  const [removeFromFriends] = userApi.useRemoveFromFriendsMutation();

  // получить всех пользователей с сервера
  const getPeoples = userApi.useGetPeoplesQuery("");

  // получить токен из localStorage
  const token: string = localStorage.getItem("token") || "";
  // @ts-ignore
  const userId: string = token ? jwt_decode(token).id : "";

  // получение друзей при загрузке страницы

  useEffect(() => {
    if (getPeoples.data && getPeoples.data.length > 0) {
      if (friends.length <= 0) {
        getFriends(userId).then((res: any) => {
          setDataFriends(
            getPeoples
              .data!.filter((item: any) => item._id !== userId)
              .filter((item: any) =>
                res.data.some((friend: any) => friend._id === item._id)
              )
          );
          setDataPeoples(
            getPeoples
              .data!.filter((item: any) => item._id !== userId)
              .filter(
                (item: any) =>
                  !res.data.some((friend: any) => friend._id === item._id)
              )
          );
        });
      } else {
        setDataFriends(
          getPeoples
            .data!.filter((item: any) => item._id !== userId)
            .filter((item: any) =>
              friends.some((friend: any) => friend._id === item._id)
            )
        );
        setDataPeoples(
          getPeoples
            .data!.filter((item: any) => item._id !== userId)
            .filter(
              (item: any) =>
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
    addToFriends(dataForFriendsActions).then((res: any) => {
      socket.emit("friendAdded", { userId, peopleId });
      let newFriend = {
        _id: peopleId,
        name: res.data.friendUser.name,
        avatar: res.data.friendUser.avatar,
        messages: [],
      };
      dispatch(addFriend(newFriend));
    });
  };

  // удаление из друзей WebSocket
  const removeFromFriendsHandler = (
    dataForFriendsActions: FormData,
    peopleId: string
  ) => {
    removeFromFriends(dataForFriendsActions).then((res: any) => {
      socket.emit("friendRemoved", { userId, peopleId });
      dispatch(deleteFriend(res.data.friendUser));
    });
  };

  return (
    <div className="messenger relative sm:static">
      <Header theme="light" />
      <Container>
        <div className="sm:flex mt-10 mb-20 sm:mb-0 sm:mt-16">
          <div className="sm:mr-5 fixed bottom-0 left-0 sm:static z-40">
            <ProfileNav />
          </div>

          <div className="messenger-content w-full text-white">
            <h1 className="text-2xl font-semibold mb-7">Друзья</h1>
            <div className="flex flex-wrap w-[100%+32px] min-h-[100px] items-center">
              {dataFriends && dataFriends.length > 0 ? (
                dataFriends.map((item: IFriend) => (
                  <PeopleCard
                    key={item._id}
                    dataFriend={item}
                    clientId={userId}
                    isFriend={true}
                    addToFriendsHandler={addToFriendsHandler}
                    removeFromFriendsHandler={removeFromFriendsHandler}
                  />
                ))
              ) : (
                <div className="w-full h-10 flex items-center justify-center">
                  <div className="text-[#ffffff80] text-lg py-5">
                    У вас пока нет друзей
                  </div>
                </div>
              )}
            </div>
            <h1 className="text-2xl font-semibold mt-10 mb-7">Люди</h1>
            <div className="flex flex-wrap min-h-[64px] h-auto items-center">
              {dataPeoples && dataPeoples.length > 0 ? (
                dataPeoples.map((item: IFriend) => (
                  <PeopleCard
                    key={item._id}
                    dataFriend={item}
                    clientId={userId}
                    isFriend={false}
                    addToFriendsHandler={addToFriendsHandler}
                    removeFromFriendsHandler={removeFromFriendsHandler}
                  />
                ))
              ) : (
                <div className="w-full flex items-center justify-center">
                  <div className="text-[#ffffff80] text-lg">
                    Все люди у вас в друзьях
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Peoples;
