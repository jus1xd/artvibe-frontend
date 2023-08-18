import { useEffect, useRef, useState } from "react";

import sendBtn from "../assets/img/messenger/sendBtn.svg";

import DialogMessage from "../components/messenger/DialogMessage";
import { messagesApi } from "../store/services/messageService";
import jwt_decode from "jwt-decode";
import { IMessage } from "../models/IMessage";
import { useAppDispatch } from "../hooks/redux";
import { io } from "socket.io-client";
import { addMessage } from "../store/slices/friendsSlice";
import { socket } from "../hooks/socket";

// Define a service using a base URL and expected endpoints
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5003";

type TProps = {
  friendId: string;
  friendName: string;
  friendAvatar: string;
  messages: IMessage[];
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
};

const Conversation: React.FC<TProps> = ({
  friendId,
  friendName,
  friendAvatar,
  messages,
  setMessages,
}) => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const infiniteScrollRef = useRef<HTMLDivElement | null>(null);
  const [liveMessages, setLiveMessages] = useState<IMessage[]>([]);
  const [messageInputValue, setMessageInputValue] = useState<string>("");

  // получить токен из localStorage
  const token = localStorage.getItem("token");
  // @ts-ignore
  const userId = token ? jwt_decode(token).id : "";

  const [sendMessage] = messagesApi.useSendMessageMutation();

  // scrollToBottom
  const scrollToBottom = () => {
    if (infiniteScrollRef.current) {
      infiniteScrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  // функция для получения сообщений

  useEffect(() => {
    // автофокус на input при загрузке страницы
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [friendId]);

  // новое сообщение
  const newMessageData = {
    clientId: userId,
    friendId: friendId,
    messageText: messageInputValue,
  };

  // sendMessage
  const sendMessageFunction = () => {
    if (messageInputValue) {
      sendMessage(newMessageData).then((res: any) => {
        // setMessages((prevMessages) => [...prevMessages, res.data]);
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

  const stepBackward = () => {
    window.history.back();
  };

  return (
    <div className="w-full sm:w-3/4 flex justify-between">
      {/* chat-section */}
      <div className="w-full sm:rounded-xl bg-[#20232B] sm:min-w-[450px] h-[calc(100vh-180px)] sm:h-[600px] overflow-hidden">
        {/* black bar  */}
        <div className="bg-black w-full flex justify-between px-3 sm:px-6 py-2">
          <div
            onClick={stepBackward}
            className="sm:hidden block text-sm cursor-pointer hover:bg-[#ffffff10] transition-colors rounded-md  px-3 py-1 w-max"
          >
            Назад
          </div>
          <div className="flex items-center text-sm">
            Беседа с
            {friendAvatar ? (
              <div className="ml-2 flex items-center justify-center overflow-hidden w-[30px] h-[30px] rounded-full">
                <img
                  src={`${baseUrl}/${friendAvatar}`}
                  className="scale-[1.5]"
                  alt=""
                />
              </div>
            ) : (
              <div
                className={`ml-2 flex items-center justify-center overflow-hidden min-w-[30px] min-h-[30px] rounded-full`}
                style={{ backgroundColor: "#ffffff30" }}
              >
                <div className="text-sm text-white font-bold">
                  {friendName.slice(0, 1).toUpperCase()}
                </div>
              </div>
            )}
            <span className="font-bold ml-2">{friendName}</span>{" "}
          </div>
          <div className="hidden sm:block text-sm cursor-pointer hover:bg-[#ffffff10] transition-colors rounded-md  px-3 py-1 w-max">
            Добавить в друзья
          </div>
        </div>
        {/* messages */}
        <div className="flex justify-end items-end overflow-hidden h-[calc(100%-110px)] mx-3 sm:mx-6">
          <div className="flex flex-col-reverse pt-3 w-full h-full overflow-y-scroll ">
            <div ref={infiniteScrollRef} className="w-full h-max">
              {messages.length > 0 ? (
                messages.map((item: any, index) => (
                  <DialogMessage
                    key={item._id}
                    senderId={item.senderId}
                    senderName={item.senderName}
                    avatar={item.senderAvatar || ""}
                    messageText={item.text}
                    date={item.date}
                    isStacked={
                      messages.length > 0 && index > 0
                        ? messages[index - 1].senderId === item.senderId
                        : false
                    }
                  />
                ))
              ) : (
                <div className="w-full h-[52vh] flex items-center justify-center">
                  <div className="text-[#ffffff80] text-sm mt-7">
                    Нет сообщений
                  </div>
                </div>
              )}
            </div>
          </div>
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
    </div>
  );
};

export default Conversation;