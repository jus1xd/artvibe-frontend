import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { io } from "socket.io-client";
import { TLastMessage } from "../../pages/messenger";
import jwt_decode from "jwt-decode";
import { socket } from "../../hooks/socket";
import moment from "moment";
import Avatar from "../Avatar";

// Define a service using a base URL and expected endpoints
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5003";

type TProps = {
  dataDialogs: TLastMessage;
  setLastMessage: (senderId: string, lastMessage: TLastMessage) => void;
};

const DialogCard: React.FC<TProps> = ({ dataDialogs, setLastMessage }) => {
  const { friendId, name, avatar, text, date } = dataDialogs;

  // получить токен из localStorage
  const token = localStorage.getItem("token");
  // @ts-ignore
  const userId = token ? jwt_decode(token).id : null;

  // получить id друга из url
  const params = useParams();
  const currentFriendId = params.id;

  const navigate = useNavigate();

  const [lastMessageText, setLastMessageText] = useState<string>(text);
  const [lastMessageDate, setLastMessageDate] = useState<string>(date);

  // Редирект на страницу диалога
  const handleRedirect = () => {
    if (currentFriendId !== friendId) {
      navigate(`/im/${friendId}`);
    }
  };

  // обновить текст и дату последнего сообщения
  useEffect(() => {
    setLastMessageText(text);
    setLastMessageDate(date);
  }, [text, date]);

  return (
    <div onClick={handleRedirect} className="w-full">
      <div
        className={`${
          currentFriendId === friendId
            ? "bg-darkBlueGray"
            : "hover:bg-darkBackground"
        } w-full h-full rounded-lg overflow-hidden mb-1 px-3 py-2  transition-colors`}
      >
        <div className="flex items-center w-full">
          {avatar ? (
            <Avatar width="35px" height="35px" avatar={avatar} />
          ) : (
            <div
              className={`flex items-center justify-center overflow-hidden min-w-[35px] min-h-[35px] rounded-full`}
              style={{ backgroundColor: "#ffffff30" }}
            >
              <div className="text-sm text-white font-bold">
                {name.slice(0, 1).toUpperCase()}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between w-[calc(100%-35px)]">
            <div className="flex flex-col ml-2 max-w-[60%]">
              <div className="font-bold text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                {name}
              </div>
              <div className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                {lastMessageText}
              </div>
            </div>
            <div className="text-[12px] opacity-50">
              {lastMessageDate && moment(lastMessageDate).format("HH:mm")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogCard;
