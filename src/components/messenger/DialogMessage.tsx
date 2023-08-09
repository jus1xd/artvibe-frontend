import React from "react";

import jwt_decode from "jwt-decode";

type TProps = {
  senderId: string;
  senderName: string;
  messageText: string;
  avatar?: string;
  date: string;
};

const DialogMessage: React.FC<TProps> = ({
  avatar,
  senderName,
  messageText,
  senderId,
  date,
}) => {
  // получить токен из localStorage
  const token = localStorage.getItem("token");
  // @ts-ignore
  const clientId = token ? jwt_decode(token).id : "";

  const time = new Date(date);
  time.setUTCHours(time.getUTCHours() + 3);

  let minutes: string =
    time.getUTCMinutes() < 10
      ? "0" + time.getUTCMinutes()
      : time.getUTCMinutes().toString(); // Получение минут
  let hours = time.getUTCHours(); // Получение часов

  const origin = senderId === clientId ? "me" : "friend";

  return origin === "me" ? (
    <div className="flex flex-col items-end mb-3">
      <div className="text-white mb-2 flex flex-row-reverse items-center">
        <img src={avatar} className="w-6" alt="" />
        {/* <div className="font-bold mr-2 text-sm">{senderName}</div> */}
      </div>
      <div className="max-w-[60%] flex items-end flex-row-reverse">
        <div className="flex flex-col w-full  py-[10px] px-3 bg-accent rounded-xl rounded-tr-none">
          <div className="flex items-center w-full">
            <div className="text-sm w-full break-words">{messageText}</div>
          </div>
        </div>
        <div className="text-sm text-[#ffffff80] mr-2 h-max">
          {hours}:{minutes}
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-start mb-3">
      <div className="text-white mb-2 flex items-center">
        <img src={avatar} className="w-6" alt="" />
        <div className="ml-2 text-sm">{senderName}</div>
      </div>
      <div className="max-w-[60%] flex items-end flex-row">
        <div className="flex flex-col w-full  py-[10px] px-3 bg-darkBlueGray rounded-xl rounded-tl-none">
          <div className="flex items-center w-full">
            <div className="text-sm w-full break-words">{messageText}</div>
          </div>
        </div>
        <div className="text-sm text-[#ffffff80] ml-2 h-max">
          {hours}:{minutes}
        </div>
      </div>
    </div>
  );
};

export default DialogMessage;
