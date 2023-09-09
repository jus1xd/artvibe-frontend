import React, { useState, useEffect } from "react";
import Avatar from "./Avatar";
import { IComment } from "../models/IPost";
import moment from "moment";
import Modal from "./Modal";
import { NavLink } from "react-router-dom";

type TProps = {
  comment: IComment;
};

// Define a service using a base URL and expected endpoints
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5003";

const Comment: React.FC<TProps> = ({ comment }) => {
  const [modalOpened, setModalOpened] = useState<boolean>(false);

  // работа с изображениями
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const { _id, userId, userName, userAvatar, createdAt, pictures, text } =
    comment;

  useEffect(() => {
    if (pictures!.length > 0) {
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
    <div key={_id} className="bg-darkBackground p-1 rounded-lg flex mt-2">
      <div className="p-[2px] h-max">
        <NavLink to={`/${userId}`}>
          {userAvatar ? (
            <Avatar width="35px" height="35px" avatar={userAvatar} />
          ) : (
            <div
              className={`flex items-center justify-center overflow-hidden w-[35px] h-[35px] rounded-full`}
              style={{ backgroundColor: "#ffffff30" }}
            >
              <div className="text-sm text-white font-bold">
                {userName.slice(0, 1).toUpperCase()}
              </div>
            </div>
          )}
        </NavLink>
      </div>
      <div className="ml-1 text-sm">
        <div className="flex items-center">
          <NavLink to={`/${userId}`}>
            <div className="text-accent mr-2">{userName}</div>
          </NavLink>
          <div className="text-[11px] opacity-60 mb-[-2px]">
            {moment(createdAt).format("hh:mm")}
          </div>
        </div>
        <div className="text-sm">{text}</div>
        {pictures && (
          <div className="picture my-1">
            <div
              style={{
                width: width,
                height: height,
                maxWidth: "280px",
                maxHeight: "180px",
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
    </div>
  );
};

export default Comment;
