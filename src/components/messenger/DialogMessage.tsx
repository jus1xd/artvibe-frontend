import React, { useEffect } from "react";

import jwt_decode from "jwt-decode";
import Avatar from "../Avatar";
import moment from "moment";
import { NavLink } from "react-router-dom";

// Define a service using a base URL and expected endpoints
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5003";

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

  const origin = senderId === clientId ? true : false;

  return (
    <div
      className={`select-none flex flex-col ${
        origin ? "items-end" : "items-start"
      } mb-[6px]`}
    >
      {!isStacked && (
        <NavLink to={`/${senderId}`}>
          <div
            className={`text-white mb-2 flex ${
              origin && "flex-row-reverse"
            }  items-center px-3 sm:px-6`}
          >
            {avatar ? (
              <Avatar width="25px" height="25px" avatar={avatar} />
            ) : (
              <div
                className={`flex items-center justify-center overflow-hidden min-w-[25px] min-h-[25px] rounded-full`}
                style={{ backgroundColor: "#ffffff30" }}
              >
                <div className="text-[11px] text-white font-bold">
                  {senderName.slice(0, 1).toUpperCase()}
                </div>
              </div>
            )}
            <div
              className={`font-medium ${
                origin ? "mr-2" : "ml-2"
              }  text-[12.5px]`}
            >
              {senderName}
            </div>
          </div>
        </NavLink>
      )}
      <div
        className={`hover:bg-[#ffffff05] w-full flex items-end ${
          origin && "flex-row-reverse"
        } px-3 sm:px-6`}
      >
        <div
          className={`max-w-[60%] flex items-end ${
            origin && "flex-row-reverse"
          }`}
        >
          <div
            className={`flex flex-col w-full py-[10px] px-3 ${
              origin
                ? "rounded-tr-none bg-accent ml-2"
                : "rounded-tl-none bg-darkBlueGray mr-2"
            }  rounded-xl `}
          >
            <div className="flex items-center w-full">
              <div className="text-sm w-full break-words">{messageText}</div>
            </div>
          </div>
          <div className="text-[12px] text-[#ffffff80] h-max">
            {moment(date).format("hh:mm")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogMessage;
