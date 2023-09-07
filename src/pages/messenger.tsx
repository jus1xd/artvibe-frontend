import React, { useCallback, useEffect, useState } from "react";
import Container from "../components/Container";
import Header from "../components/Header";

import jwt_decode from "jwt-decode";

import DialogCard from "../components/messenger/DialogCard";
import Conversation from "./conversation";
import { userApi } from "../store/services/userService";
import Spinner from "../components/SpinnerLoader";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { addMessage, setFriends } from "../store/slices/friendsSlice";
import ProfileNav from "../components/ProfileNav";
import { socket } from "../hooks/socket";
import { IMessage } from "../models/IMessage";
import ProfileWrapper from "../components/ProfileWrapper";

export type TLastMessage = {
  friendId: string;
  avatar: string;
  name: string;
  date: string;
  text: string;
};

const Messenger = () => {
  const dispatch = useAppDispatch();

  // получить токен из localStorage
  const token = localStorage.getItem("token");
  // @ts-ignore
  const userId = token ? jwt_decode(token).id : null;

  const [friendMessages, setFriendMessages] = useState<IMessage[]>([]);
  const [dataDialogs, setDataDialogs] = useState<TLastMessage[]>([]);
  const [dataDialogsLoading, setDataDialogsLoading] = useState<boolean>(true);
  const [dialogsSearch, setDialogsSearch] = useState<string>("");

  // сортировка диалогов по времени последнего сообщения
  const sortDialogsByTime = (arr: any) => {
    if (arr.length > 0) {
      return arr.sort((a: any, b: any) => {
        if (a?.date > b?.date) {
          return -1;
        }
        if (a?.date < b?.date) {
          return 1;
        }
        return 0;
      });
    } else {
      return [];
    }
  };

  const [getFriends] = userApi.useGetFriendsMutation();
  const friends = useAppSelector((state) => state.friends.friends);

  const MemoizedDialogCard = React.memo(DialogCard);

  // получить id друга из url
  const params = useParams();
  const friendId = params.id;

  // функция на получение друзей
  useEffect(() => {
    if (friends.length <= 0) {
      getFriends(userId).then((res: any) => {
        let dataDialogs = res.data.map((item: any) => ({
          friendId: item._id,
          avatar: item.avatar,
          name: item.name,
          date: item.messages[item.messages.length - 1]?.date || "",
          text: item.messages[item.messages.length - 1]?.text,
        }));
        setDataDialogs(dataDialogs);
        dispatch(setFriends(res.data));
        setDataDialogsLoading(false);
      });
    } else {
      let dataDialogs = friends.map((item: any) => ({
        friendId: item._id,
        avatar: item.avatar,
        name: item.name,
        date: item.messages[item.messages.length - 1]?.date || "",
        text: item.messages[item.messages.length - 1]?.text,
      }));
      setDataDialogs(dataDialogs);
      setDataDialogsLoading(false);
    }
  }, []);

  useEffect(() => {
    // получение сообщений друга
    setFriendMessages(
      friends.find((el) => el._id === friendId)?.messages || []
    );
  }, [friendId, friends]);

  // // получение друзей при загрузке страницы
  useEffect(() => {
    // if (friends.length <= 0) {
    //   getFriendsAndSave();
    // } else {
    let dataDialogs = friends.map((item: any) => ({
      friendId: item._id,
      avatar: item.avatar,
      name: item.name,
      date: item.messages[item.messages.length - 1]?.date || "",
      text: item.messages[item.messages.length - 1]?.text,
    }));
    setDataDialogs(dataDialogs);
    setDataDialogsLoading(false);
    // }
  }, [friends]);

  const setLastMessage = (senderId: string, lastMessage: TLastMessage) => {
    if (
      (lastMessage.friendId === userId || senderId === userId) &&
      (lastMessage.friendId === friendId || senderId === friendId)
    ) {
      let dataDialogsCopy = [...dataDialogs];
      const indexOfMessage = dataDialogs.findIndex(
        (el) => el.friendId === lastMessage.friendId
      );
      dataDialogsCopy[indexOfMessage] = lastMessage;
      setDataDialogs(dataDialogsCopy);
    }
  };

  const handleConversation = () => {
    if (friendId && friends.find((el) => el._id === friendId)) {
      let friendName = friends.find((el) => el._id === friendId)!.name || "";
      let friendAvatar =
        friends.find((el) => el._id === friendId)!.avatar || "";
      return (
        <Conversation
          friendId={friendId}
          friendName={friendName}
          friendAvatar={friendAvatar}
          messages={friendMessages}
          setMessages={setFriendMessages}
        />
      );
    } else {
      return (
        <div className="hidden sm:block rounded-xl bg-[#20232B] min-w-[300px] w-3/4 h-full overflow-hidden">
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-[#ffffff80] text-md mt-7">Выберите диалог</div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="messenger relative sm:static">
      <Header theme="light" />
      <Container noBorder>
        <div className="w-full sm:flex mt-5 sm:mt-10">
          <ProfileNav />
          <ProfileWrapper>
            {/* dialogs */}
            <div className="flex h-full">
              <div
                className={`${
                  friendId ? "hidden" : "block"
                } sm:block sm:rounded-xl sm:bg-[#20232B] w-full sm:w-[290px] sm:mr-3 min-w-[290px] h-full max-h-[600px] sm:max-h-full`}
              >
                {/* search */}
                <div className="flex items-center justify-between px-4 pt-3">
                  <input
                    value={dialogsSearch}
                    onChange={(e) => setDialogsSearch(e.target.value)}
                    placeholder="Найти.."
                    className="placeholder:!text-[#ffffff80] w-full text-sm cursor-pointer bg-[#ffffff10] outline-none  rounded-md px-3 py-2"
                  />
                </div>
                <div className="flex flex-col cursor-pointer justify-center items-center w-full p-2 h-[calc(100%-40px)] overflow-hidden">
                  <div className="w-full h-full overflow-y-scroll">
                    {dataDialogs.length > 0 ? (
                      sortDialogsByTime(
                        dataDialogs
                          .slice()
                          .filter((el) =>
                            el.name
                              .toLowerCase()
                              .includes(dialogsSearch.toLowerCase())
                          )
                      ).map((item: TLastMessage) => (
                        <DialogCard
                          key={item.friendId}
                          dataDialogs={item}
                          setLastMessage={setLastMessage}
                        />
                      ))
                    ) : dataDialogsLoading ? (
                      <div className="flex justify-center items-center w-full py-5">
                        <Spinner size={25} />
                      </div>
                    ) : (
                      <div className="text-[#ffffff80] text-sm mt-7 text-center w-full">
                        У вас пока нет друзей
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* conversation */}
              {handleConversation()}
            </div>
          </ProfileWrapper>
        </div>
      </Container>
    </div>
  );
};

export default Messenger;
