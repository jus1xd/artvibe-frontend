import React, { useState, useEffect } from "react";
import Avatar from "./Avatar";
import useSound from "use-sound";
import messageSound from "../assets/sounds/message3.mp3";
import { NavLink } from "react-router-dom";

const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5003";

type TProps = {
  id: string;
  avatar: string;
  name: string;
  message: string;
  toastTagText?: string;
};

const Toast: React.FC<TProps> = ({
  id,
  avatar,
  name,
  message,
  toastTagText,
}) => {
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    setActive(true);
    setTimeout(() => {
      setActive(false);
    }, 4000);
  }, []);

  return (
    <div
      className={`${
        !active && "invisible opacity-0"
      }  transition-all bg-darkBlueGray mt-5 p-2 ${
        toastTagText ? "pt-4" : "pt-4"
      } relative z-20 rounded-xl w-[250px] h-max max-h-[95px] text-white`}
    >
      <NavLink to={`/im/${id}`}>
        <div className="z-20 absolute text-[12px] font-bold top-[-14px] left-[-10px] border-[3px] bg-darkBackground rounded-xl border-darkBackground text-accent py-0 px-2">
          {/* {toastTagText} */}
          Новое сообщение
        </div>
        <div className="flex">
          <div className="mr-2">
            <Avatar avatar={avatar} width="45px" height="45px" />
          </div>
          <div className="flex flex-col justify-between w-3/4">
            <div className="name">{name}</div>
            <div className="text-sm w-full whitespace-nowrap overflow-hidden text-ellipsis">
              {message}
            </div>
          </div>
        </div>
        {/* audio  */}
        <audio autoPlay>
          <source src={messageSound} type="audio/mp3" />
          Ваш браузер не поддерживает аудио элемент.
        </audio>
      </NavLink>
    </div>
  );
};

export default Toast;
