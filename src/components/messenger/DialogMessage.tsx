import React, { useEffect } from "react";

import jwt_decode from "jwt-decode";

type TProps = {
  senderId: string;
  senderName: string;
  messageText: string;
  avatar?: string;
  date: string;
  isStacked?: boolean;
};

const DialogMessage: React.FC<TProps> = ({
  avatar,
  senderName,
  messageText,
  senderId,
  date,
  isStacked,
}) => {
  // получить токен из localStorage
  const token = localStorage.getItem("token");
  // @ts-ignore
  const clientId = token ? jwt_decode(token).id : "";

  // вынимаем время из сообщения
  const time = new Date(date);
  time.setUTCHours(time.getUTCHours() + 3);

  let minutes: string =
    time.getUTCMinutes() < 10
      ? "0" + time.getUTCMinutes()
      : time.getUTCMinutes().toString(); // Получение минут
  let hours = time.getUTCHours(); // Получение часов

  const origin = senderId === clientId ? "me" : "friend";

  return origin === "me" ? (
    <div className="flex flex-col items-end mb-[6px]">
      {!isStacked && (
        <div className="text-white mb-2 flex flex-row-reverse items-end">
          {avatar ? (
            <div className="flex items-center justify-center overflow-hidden w-[25px] h-[25px] rounded-full">
              <img
                src={`http://localhost:5003/${avatar}`}
                className="scale-[1.5]"
                alt=""
              />
            </div>
          ) : (
            <div
              className={`flex items-center justify-center overflow-hidden min-w-[25px] min-h-[25px] rounded-full`}
              style={{ backgroundColor: "#ffffff30" }}
            >
              <div className="text-sm text-white font-bold">
                {senderName.slice(0, 1).toUpperCase()}
              </div>
            </div>
          )}
          <div className="font-medium mr-2 text-[12.5px]">{senderName}</div>
        </div>
      )}
      <div className="max-w-[60%] flex items-end flex-row-reverse">
        <div className="flex flex-col w-full  py-[10px] px-3 bg-accent rounded-xl rounded-tr-none">
          <div className="flex items-center w-full">
            <div className="text-sm w-full break-words">{messageText}</div>
          </div>
        </div>
        <div className="text-[12px] text-[#ffffff80] mr-2 h-max">
          {hours}:{minutes}
        </div>
      </div>
    </div>
  ) : (
    <div className={`flex flex-col items-start mb-[6px]`}>
      {!isStacked && (
        <div className="text-white mb-2 flex items-center">
          {avatar ? (
            <div className="flex items-center justify-center overflow-hidden w-[25px] h-[25px] rounded-full">
              <img
                src={`http://localhost:5003/${avatar}`}
                className="scale-[1.5]"
                alt=""
              />
            </div>
          ) : (
            <div
              className={`flex items-center justify-center overflow-hidden min-w-[25px] min-h-[25px] rounded-full`}
              style={{ backgroundColor: "#ffffff30" }}
            >
              <div className="text-sm text-white font-bold">
                {senderName.slice(0, 1).toUpperCase()}
              </div>
            </div>
          )}
          <div className="ml-2 text-[12px]">{senderName}</div>
        </div>
      )}
      <div className="max-w-[60%] flex items-end flex-row">
        <div className="flex flex-col w-full  py-[10px] px-3 bg-darkBlueGray rounded-xl rounded-tl-none">
          <div className="flex items-center w-full">
            <div className="text-sm w-full break-words">{messageText}</div>
          </div>
        </div>
        <div className="text-[12px] text-[#ffffff80] ml-2 h-max">
          {hours}:{minutes}
        </div>
      </div>
    </div>
  );
};

export default DialogMessage;
