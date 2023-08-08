import { useEffect, useRef, useState } from "react";

import avatar1 from "../assets/img/messenger/avatar1.png";
import avatar3 from "../assets/img/messenger/avatar3.png";
import sendBtn from "../assets/img/messenger/sendBtn.svg";

import DialogMessage from "../components/messenger/DialogMessage";
import { messagesApi } from "../store/services/messageService";
import jwt_decode from "jwt-decode";
import { IMessage } from "../models/IMessage";
import { userApi } from "../store/services/userService";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setMessages } from "../store/slices/messagesSlice";
import { io } from "socket.io-client";

const socket = io("http://localhost:5003");

type TProps = {
  friendId: string;
  avatar: string;
  setLastMessage: (message: string) => void;
};

const Conversation: React.FC<TProps> = ({
  friendId,
  avatar,
  setLastMessage,
}) => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [sortedMessages, setSortedMessages] = useState<IMessage[]>([]);
  const [messageInputValue, setMessageInputValue] = useState<string>("");

  // получить токен из localStorage
  const token = localStorage.getItem("token");
  // @ts-ignore
  const userId = token ? jwt_decode(token).id : "";

  const dialogs = useAppSelector((state) => state.messages.dialogs); // Замените "messages" на имя вашего среза
  const friends = useAppSelector((state) => state.friends.friends);

  const [getMessages] = messagesApi.useGetMessagesMutation();
  const [sendMessage] = messagesApi.useSendMessageMutation();
  const [getFriends] = userApi.useGetFriendsMutation();

  // получить имя друга с которым общаемся по id
  const [friendName, setFriendName] = useState<string>("");
  const [friendAvatar, setFriendAvatar] = useState<string>("");

  // form data для получения друзей
  const dataForGetFriendlist = new FormData();
  dataForGetFriendlist.append("userId", userId);

  useEffect(() => {
    if (!friends) {
      getFriends(dataForGetFriendlist).then((res) => {
        // @ts-ignore
        console.log("hereResFr", res.data);
        // @ts-ignore
        res.data.map((item: any) => {
          if (item._id === friendId) {
            setFriendName(item.name);
            setFriendAvatar(item.avatar);
          }
        });
      });
    } else {
      console.log("friends", friends);
      friends.map((item) => {
        if (item._id === friendId) {
          setFriendName(item.name);
          setFriendAvatar(item.avatar);
        }
      });
    }
  }, [friendId, friends]);

  useEffect(() => {
    socket.on("sendMessage", (message) => {
      setSortedMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("sendMessage");
    };
  }, []);

  // получить сообщения с сервера
  useEffect(() => {
    // Проверяем, есть ли в store диалог с сообщениями для данного диалога
    const existingDialog = dialogs.find(
      (dialog) => dialog.idOfFriend === friendId
    );

    if (!existingDialog) {
      getMessages({
        clientId: userId,
        friendId: friendId,
      }).then((res) => {
        // @ts-ignore
        dispatch(setMessages(res.data));
        // @ts-ignore
        setSortedMessages(res.data);
      });
    } else {
      // @ts-ignore
      setSortedMessages(existingDialog?.messages);
    }
  }, [userId, friendId]);

  // новое сообщение
  const newMessageData = {
    clientId: userId,
    friendId: friendId,
    messageText: messageInputValue,
  };

  // sendMessage
  const sendMessageFunction = () => {
    if (messageInputValue) {
      sendMessage(newMessageData);
      socket.emit("sendMessage", {
        id: userId,
        friendId: friendId,
        messageText: messageInputValue,
      });
      setMessageInputValue("");
    }
  };

  // send message handler by key
  const sendMessageHandler = (e: any) => {
    if (e.key === "Enter") {
      sendMessageFunction();
    }
  };

  return (
    <div className="w-3/4 flex justify-between">
      {/* chat-section */}
      <div className="rounded-xl bg-[#20232B] w-3/4 mr-7 min-w-[450px] h-[600px] overflow-hidden">
        {/* black bar  */}
        <div className="bg-black w-full flex justify-between px-6 py-2">
          <div className="flex items-center text-sm">
            Беседа с
            <div
              className={`ml-2 flex items-center justify-center overflow-hidden min-w-[30px] min-h-[30px] rounded-full`}
              style={{ backgroundColor: avatar }}
            >
              {/* <img src={avatar} alt="" /> */}
              <div className="text-sm text-white font-bold">
                {friendName.slice(0, 2).toUpperCase()}
              </div>
            </div>
            <span className="font-bold ml-2">{friendName}</span>{" "}
          </div>
          <div className="text-sm cursor-pointer hover:bg-[#ffffff10] transition-colors rounded-md  px-3 py-1 w-max">
            Добавить в друзья
          </div>
        </div>
        {/* messages */}
        <div className="flex flex-col-reverse pt-3 overflow-y-scroll h-[calc(100%-110px)] mx-6">
          {sortedMessages.length > 0 ? (
            sortedMessages
              .slice()
              .reverse()
              .map((item) => (
                <DialogMessage
                  key={item._id}
                  senderId={item.senderId}
                  senderName={item.senderName}
                  avatar={item.senderAvatar || avatar1}
                  messageText={item.text}
                  date={item.date}
                />
              ))
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-[#ffffff80] text-sm mt-7">Нет сообщений</div>
            </div>
          )}
        </div>
        {/* input */}
        <div className="flex justify-between items-center px-6 py-2 relative">
          <input
            placeholder="Напишите сообщение.."
            value={messageInputValue}
            ref={inputRef}
            onChange={(e) => setMessageInputValue(e.target.value)}
            onKeyDown={(e) => sendMessageHandler(e)}
            className="placeholder:!text-[#ffffff80] w-full text-sm cursor-pointer bg-darkBlueGray outline-none rounded-2xl py-3 pl-5 pr-12"
          />
          <div
            onClick={sendMessageFunction}
            className="cursor-pointer hover:opacity-100 opacity-80 absolute right-7 transition-all rounded-md p-2"
          >
            <img src={sendBtn} alt="" />
          </div>
        </div>
      </div>
      {/* карточка собеседника */}
      <div className="rounded-xl bg-[#20232B] w-1/4 h-14"></div>
    </div>
  );
};

export default Conversation;
