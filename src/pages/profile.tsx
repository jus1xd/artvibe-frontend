import React, { useEffect, useState, useMemo } from "react";
import Container from "../components/Container";
import Header from "../components/Header";
import jwt_decode from "jwt-decode";
import { userApi } from "../store/services/userService";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { io } from "socket.io-client";
import Button from "../components/Button";
import PageCover from "../components/profile/PageCover";
import PeopleCard from "../components/PeopleCard";
import { addFriend, deleteFriend } from "../store/slices/friendsSlice";
import ProfileNav from "../components/ProfileNav";
import { IFriend } from "../models/IFriend";

// Define a service using a base URL and expected endpoints
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5003";

const socket = io(baseUrl);

const Profile = () => {
  const dispatch = useAppDispatch();
  const [dataFriends, setDataFriends] = useState<IFriend[]>([]);

  // получить токен из localStorage
  const token = localStorage.getItem("token");
  // @ts-ignore
  const currentUser = token ? jwt_decode(token).id : null;

  // получить id профиля из url
  const params = useParams();
  const userId = params.id || "";

  // узнать является ли страница профиля моей страницей
  const isMyProfile = useMemo(() => {
    return currentUser === userId;
  }, [currentUser, userId]);

  // получить друзей из стора либо запросом
  const [getFriends] = userApi.useGetFriendsMutation();
  const friends = useAppSelector((state) => state.friends.friends);

  // получить данные профиля запросом
  const { data } = userApi.useGetUserByIdQuery(userId);

  // запрос на получение моих друзей
  const [addToFriends] = userApi.useAddToFriendsMutation();
  const [removeFromFriends] = userApi.useRemoveFromFriendsMutation();

  // получение друзей при загрузке страницы

  useEffect(() => {
    if (currentUser === userId) {
      if (friends.length <= 0) {
        getFriends(userId).then((res: any) => {
          setDataFriends(res.data);
          console.log(res.data);
        });
      } else {
        console.log(friends);
        setDataFriends(
          friends.map((friend: any) => {
            return {
              _id: friend._id,
              name: friend.name,
              avatar: friend.avatar,
              messages: [],
            };
          })
        );
      }
    } else {
      getFriends(userId).then((res: any) => {
        setDataFriends(res.data);
      });
    }
  }, [friends, userId]);

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

  const MemoizedPeopleCard = React.memo(PeopleCard, (prevProps, nextProps) => {
    console.log(prevProps.dataFriend);
    return prevProps.dataFriend === nextProps.dataFriend;
  });

  return (
    <div className="messenger relative sm:static">
      <Header theme="light" />
      <Container>
        <div className="w-full sm:flex mb-20 mt-5 sm:mt-16">
          <div className="sm:mr-5 fixed bottom-0 left-0 sm:static z-40">
            <ProfileNav />
          </div>
          {data && (
            <div className="profile-content w-full text-white ">
              {/* profile */}
              <div className="rounded-xl bg-[#20232B] sm:w-[775px] sm:min-w-[775px] sm:mr-7 mb-4">
                <PageCover
                  isMyProfile={isMyProfile}
                  userId={data._id}
                  pageCover={data.pageCover}
                  avatar={data.avatar}
                />
                <div className="sm:flex mt-[-80px] sm:mt-[-35px] items-end pb-2 sm:pb-7">
                  {/* avatar  */}
                  <div className="z-10 w-[130px] h-[130px] mx-auto sm:ml-8 bg-[#20232B]  flex items-center justify-center rounded-full overflow-hidden cursor-pointer">
                    <div
                      className={`rounded-full overflow-hidden  ${
                        data.role === "admin"
                          ? "w-[123px] h-[123px] border-4 z-10 border-accent"
                          : "w-[130px] h-[130px]"
                      } `}
                    >
                      <div className="flex items-center justify-center h-full w-full">
                        {data.avatar ? (
                          <div
                            className={`flex items-center justify-center overflow-hidden ${
                              data.role === "admin"
                                ? "w-[123px] h-[123px]"
                                : "w-[130px] h-[130px]"
                            } rounded-full`}
                          >
                            <img
                              src={`${baseUrl}/${data.avatar}`}
                              className="scale-[2]"
                              alt="Avatar"
                            />
                          </div>
                        ) : (
                          <div
                            className={`flex items-center justify-center overflow-hidden ${
                              data.role === "admin"
                                ? "w-[123px] h-[123px]"
                                : "w-[130px] h-[130px]"
                            } rounded-full`}
                            style={{ backgroundColor: "#ffffff30" }}
                          >
                            <div className="text-3xl text-white font-bold">
                              {data.name.slice(0, 1).toUpperCase()}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 w-[calc(100%-30px)] sm:w-[calc(100%-180px)] mr-8 flex flex-col">
                    {/* name  */}
                    <div className="my-2 sm:mb-1 w-full flex items-center justify-between">
                      <div className="flex flex-col">
                        <div className="flex items-center mb-[6px]">
                          <div className="text-sm text-white opacity-70">
                            {"@" + data.username.toLowerCase()}
                          </div>
                          <div>
                            {data.city && (
                              <div className="flex mt-[-1px] items-center ml-4 cursor-pointer">
                                <div className="w-max">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="9"
                                    height="13"
                                    viewBox="0 0 9 13"
                                    fill="none"
                                  >
                                    <circle
                                      cx="4.5"
                                      cy="4.5"
                                      r="2"
                                      stroke="#635BFF"
                                    />
                                    <path
                                      d="M8.5 4.79431C8.5 5.35654 8.30521 6.06896 7.96382 6.86607C7.62609 7.65461 7.16243 8.48629 6.66466 9.27503C5.88092 10.5169 5.03229 11.6218 4.5 12.2497C3.96771 11.6218 3.11908 10.5169 2.33534 9.27503C1.83757 8.48629 1.37391 7.65461 1.03618 6.86607C0.694791 6.06896 0.5 5.35654 0.5 4.79431C0.5 2.39232 2.32023 0.5 4.5 0.5C6.67977 0.5 8.5 2.39232 8.5 4.79431Z"
                                      stroke="#635BFF"
                                    />
                                  </svg>
                                </div>
                                <div className="ml-[2px] mb-[-1px] text-[12px] text-accent hover:underline underline-offset-2 cursor-pointer">
                                  {data.city}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex">
                          <h1 className="text-xl font-bold">{data.name}</h1>
                          {data.role === "admin" && (
                            <div className="text-[12px] select-none font-bold text-accent ml-1">
                              dev
                            </div>
                          )}
                          {data.isVerified ? "" : ""}
                        </div>
                      </div>
                      {isMyProfile ? (
                        <Button text="Редактировать" type="accent" size="sm" />
                      ) : (
                        <Button
                          text="Добавить в друзья"
                          type="accent"
                          size="sm"
                        />
                      )}
                    </div>

                    <div
                      className={`${
                        data.status ? "" : "hidden"
                      } mb-2 sm:mb-0 flex min-h-[20px] max-w-[370px] cursor-pointer overflow-x-hidden group`}
                    >
                      <div className="w-full group-hover:opacity-80 transition-opacity text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                        {data.status}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:flex">
                <div className="relative rounded-xl bg-[#20232B] p-2 pt-6 pb-[2px] sm:w-[240px] min-w-[254px] ">
                  <div className="z-20 absolute text-[12px] font-bold top-[-8px] left-[-10px] border-[3px] bg-darkBackground rounded-xl border-darkBackground text-accent py-0 px-2">
                    Друзья
                  </div>
                  <div className="h-[320px] rounded-xl overflow-y-scroll">
                    {dataFriends && dataFriends.length > 0 ? (
                      dataFriends.map((item: any) => (
                        <MemoizedPeopleCard
                          noMargin
                          key={item._id}
                          dataFriend={item}
                          clientId={userId}
                          isFriend={true}
                          addToFriendsHandler={addToFriendsHandler}
                          removeFromFriendsHandler={removeFromFriendsHandler}
                        />
                      ))
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-[#ffffff80] py-5">
                          У вас пока нет друзей
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Profile;
