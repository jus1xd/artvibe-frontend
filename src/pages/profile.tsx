import React, { useEffect, useState, useMemo } from "react";
import Container from "../components/Container";
import Header from "../components/Header";
import jwt_decode from "jwt-decode";
import { userApi } from "../store/services/userService";
import { NavLink, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { io } from "socket.io-client";
import Button from "../components/Button";
import PageCover from "../components/profile/PageCover";
import PeopleCard from "../components/PeopleCard";
import {
  addFriend,
  deleteFriend,
  setFriends,
} from "../store/slices/friendsSlice";
import ProfileNav from "../components/ProfileNav";
import { IFriend } from "../models/IFriend";
import { socket } from "../hooks/socket";
import ResizableTextarea from "../components/ResizableTextarea";
import PostCard from "../components/PostCard";
import { IPost } from "../models/IPost";
import { postApi } from "../store/services/postService";
import ProfileWrapper from "../components/ProfileWrapper";

// Define a service using a base URL and expected endpoints
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5003";

const Profile = () => {
  const dispatch = useAppDispatch();
  const [dataFriends, setDataFriends] = useState<IFriend[]>([]);
  const [dataPosts, setDataPosts] = useState<IPost[]>([]);
  const [newPostValue, setNewPostValue] = useState<string>("");
  const [pictures, setPictures] = useState<File | null>(null);

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
  const [createPost] = postApi.useCreatePostMutation();
  const [deletePost] = postApi.useDeletePostMutation();
  const [addToFriends] = userApi.useAddToFriendsMutation();
  const [removeFromFriends] = userApi.useRemoveFromFriendsMutation();

  // получение друзей при загрузке страницы
  useEffect(() => {
    if (data) {
      if (currentUser === userId) {
        if (friends.length <= 0) {
          dispatch(setFriends(data.friends));
          setDataFriends(data.friends);
          setDataPosts(data.posts);
        } else {
          setDataFriends(
            friends.map((friend: any) => {
              return {
                _id: friend._id,
                name: friend.name,
                avatar: friend.avatar,
                messages: [],
                isOnline: friend.isOnline,
              };
            })
          );
          setDataPosts(data.posts);
        }
      } else {
        if (friends.length <= 0) {
          getFriends(currentUser).then((res: any) => {
            dispatch(setFriends(res.data));
          });
        } else {
          setDataFriends(
            friends.map((friend: any) => {
              return {
                _id: friend._id,
                name: friend.name,
                avatar: friend.avatar,
                messages: [],
                isOnline: friend.isOnline,
              };
            })
          );
        }
        setDataFriends(
          data.friends.filter((item: any) => item._id !== currentUser)
        );
        setDataPosts(data.posts);
      }
    }
  }, [data, userId]);

  // textarea handler
  const handleNewpostInput = (newPostValue: string) => {
    setNewPostValue(newPostValue);
  };

  // добавление в друзья WebSocket
  const addToFriendsHandler = (
    setIsFriendLoading: React.Dispatch<React.SetStateAction<boolean>>,
    dataForFriendsActions: FormData,
    peopleId: string
  ) => {
    addToFriends(dataForFriendsActions).then((res: any) => {
      socket.emit("friendAdded", { currentUser, peopleId });
      let newFriend = {
        _id: peopleId,
        name: res.data.friendUser.name,
        avatar: res.data.friendUser.avatar,
        messages: [],
      };
      dispatch(addFriend(newFriend));
      setIsFriendLoading(false);
    });
  };

  // удаление из друзей WebSocket
  const removeFromFriendsHandler = (
    setIsFriendLoading: React.Dispatch<React.SetStateAction<boolean>>,
    dataForFriendsActions: FormData,
    peopleId: string
  ) => {
    removeFromFriends(dataForFriendsActions).then((res: any) => {
      socket.emit("friendRemoved", { currentUser, peopleId });
      dispatch(deleteFriend(res.data.friendUser));
      setIsFriendLoading(false);
    });
  };

  // создание поста
  const handleSend = () => {
    const postData = new FormData();
    postData.append("id", userId);
    postData.append("authorId", currentUser);
    postData.append("text", newPostValue);
    postData.append("pictures", pictures!);
    console.log("postData", postData);

    createPost(postData).then((res: any) => {
      setDataPosts([...dataPosts, res.data]);
    });

    setNewPostValue("");
    setPictures(null);
  };

  // удаление поста
  const deletePostHandler = (postId: string) => {
    deletePost({ originId: userId, postId, userId: currentUser }).then(() => {
      setDataPosts(dataPosts.filter((item: any) => item._id !== postId));
    });
  };

  return (
    <div className="messenger relative sm:static">
      <Header theme="light" />
      <Container>
        <div className="w-full sm:flex mb-20 mt-5 sm:mt-10">
          <ProfileNav />
          <ProfileWrapper>
            {data && (
              <div className="profile-content w-full text-white ">
                {/* profile */}
                <div className="rounded-xl bg-[#20232B] sm:w-[100%] sm:min-w-[775px] sm:mr-7 mb-4">
                  <PageCover
                    isMyProfile={isMyProfile}
                    userId={data._id}
                    pageCover={data.pageCover}
                    avatar={data.avatar}
                  />
                  <div className="sm:flex mt-[-80px] sm:mt-[-35px] items-end pb-2 sm:pb-7">
                    {/* avatar  */}
                    <div className="relative">
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
                      <div className="online-status">
                        {(data.isOnline || isMyProfile) && (
                          <div className="w-5 h-5 rounded-full bg-accent border-4 border-[#20232B] absolute bottom-3 right-3 z-50"></div>
                        )}
                      </div>
                    </div>
                    <div className="ml-4 w-[calc(100%-30px)] sm:w-[calc(100%-200px)] mr-8 flex flex-col">
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
                          <NavLink to={`/edit/${userId}`}>
                            <Button
                              text="Редактировать"
                              type="accent"
                              size="sm"
                            />
                          </NavLink>
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
                <div className="flex flex-col-reverse sm:flex-row">
                  {/* posts  */}
                  <div className="sm:mr-5 relative rounded-xl bg-[#20232B] p-4 pt-7 pb-[2px] sm:w-[calc(676px)] ">
                    <div className="z-20 absolute text-[12px] font-bold top-[-8px] left-[-10px] border-[3px] bg-darkBackground rounded-xl border-darkBackground text-accent py-0 px-2">
                      Стена дурова
                    </div>
                    {/* <div className="mb-3"> */}
                    <div className="h-max">
                      <ResizableTextarea
                        onChange={handleNewpostInput}
                        value={newPostValue}
                        setPictures={setPictures}
                        handleSend={handleSend}
                        placeholder="Что у вас нового?"
                      />
                    </div>
                    {/* </div> */}
                    <div className="w-full h-1/2">
                      {dataPosts.length > 0 ? (
                        dataPosts
                          .slice()
                          .reverse()
                          .map((item: IPost) => (
                            <PostCard
                              key={item._id}
                              postId={item._id}
                              createdAt={item.createdAt}
                              authorId={item.authorId}
                              isMyPost={item.authorId === currentUser}
                              authorName={item.authorName}
                              authorAvatar={item.authorAvatar}
                              text={item.text}
                              pictures={item.pictures}
                              likesCount={item.likes}
                              commentsCount={item.comments.length}
                              deletePostHandler={deletePostHandler}
                              isPostLoading={false}
                            />
                          ))
                      ) : (
                        <div className="w-full flex items-center justify-center">
                          <div className="text-[#ffffff80] py-5">
                            У вас пока нет записей
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* friends  */}
                  <div className="relative rounded-xl bg-[#20232B] mb-4 sm:mb-0 p-2 pt-6 pb-[2px] h-max sm:w-[240px] min-w-[254px] ">
                    <div className="z-20 absolute text-[12px] font-bold top-[-8px] left-[-10px] border-[3px] bg-darkBackground rounded-xl border-darkBackground text-accent py-0 px-2">
                      Друзья
                    </div>
                    <div className="h-[320px] rounded-xl overflow-y-scroll">
                      {dataFriends && dataFriends.length > 0 ? (
                        dataFriends.map((item: IFriend) => (
                          <PeopleCard
                            noMargin
                            key={item._id}
                            dataFriend={item}
                            clientId={currentUser}
                            isFriend={friends.some(
                              (friend: any) => friend._id === item._id
                            )}
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
          </ProfileWrapper>
        </div>
      </Container>
    </div>
  );
};

export default Profile;
