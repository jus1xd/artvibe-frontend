import React, { useEffect } from "react";

import jwt_decode from "jwt-decode";
import Avatar from "../Avatar";
import moment from "moment";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Modal from "../Modal";

// Define a service using a base URL and expected endpoints
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5003";

type TProps = {
  senderId: string;
  senderName: string;
  messageText: string;
  pictures: string;
  avatar?: string;
  date: string;
  isStacked?: boolean;
};

const DialogMessage: React.FC<TProps> = ({
  avatar,
  senderName,
  messageText,
  pictures,
  senderId,
  date,
  isStacked,
}) => {
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  // получить токен из localStorage
  const token = localStorage.getItem("token");
  // @ts-ignore
  const clientId = token ? jwt_decode(token).id : "";

  const origin = senderId === clientId ? true : false;

  // работа с изображениями
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (pictures) {
      const imgSrc = `${baseUrl}/${pictures}`;

      const img = new Image();
      img.src = imgSrc;

      img.onload = () => {
        setWidth(img.width);
        setHeight(img.height);
      };

      console.log(width, height);
    }
  }, [pictures]);

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
            className={`flex flex-col w-full px-3 py-[7px] ${
              !messageText && "!p-0 !bg-[#ffffff00]"
            } ${
              origin
                ? "rounded-tr-none bg-accent ml-2"
                : "rounded-tl-none bg-darkBlueGray mr-2"
            }  rounded-xl `}
          >
            <div className={`flex items-center w-full `}>
              <div className="text-sm w-full break-words">
                {messageText}
              </div>
            </div>
            {pictures && (
              <div className={`picture ${messageText && "mt-1"}`}>
                <div
                  style={{
                    width: width,
                    height: height,
                    maxWidth: "200px",
                    maxHeight: "150px",
                  }}
                  className={`cursor-pointer select-none relative overflow-hidden rounded-xl`}
                >
                  <img
                    onClick={() => setModalOpened(true)}
                    src={`${baseUrl}/${pictures}`}
                    alt="post"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto"
                  />
                </div>
                <Modal
                  width="100%"
                  height="100%"
                  maxWidth="45%"
                  maxHeight="70%"
                  noBackground
                  isOpened={modalOpened}
                  setIsOpened={setModalOpened}
                >
                  {/* <div className="max-w-[50%] max-h-[65%] w-[50%] h-max"> */}
                  <img
                    src={`${baseUrl}/${pictures}`}
                    alt="post"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-full max-h-full w-auto h-auto"
                  />
                  {/* </div> */}
                </Modal>
              </div>
            )}
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
