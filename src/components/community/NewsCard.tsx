import React, { useState } from "react";

import activeLike from "../../assets/img/activeLike.svg";
import like from "../../assets/img/like.svg";
import activeComment from "../../assets/img/activeComment.svg";
import comment from "../../assets/img/comment.svg";

import moment from "moment";
import Modal from "../Modal";

type TProps = {
  photo: string;
  title: string;
  text: Array<string>;
  timestamp: string;
};

const NewsCard: React.FC<TProps> = ({ photo, title, text, timestamp }) => {
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isCommented, setIsCommented] = useState<boolean>(false);

  const likesCount = 0;
  const commentsCount = 0;

  return (
    <div className="mb-5 bg-darkBlueGray rounded-lg overflow-hidden max-w-[650px] w-full">
      <div className=" flex justify-center items-center w-full h-40 sm:h-60 overflow-hidden">
        <div className="relative w-full h-full">
          <img
            src={photo}
            alt=""
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto"
          />
        </div>
      </div>
      <div className="relative px-5 py-4 w-full bg-darkBlueGray mt-[-5px] z-10 rounded-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
          <div className="text-lg font-semibold">{title}</div>
          <div className="opacity-70 text-sm">
            {moment(timestamp).calendar()}
          </div>
        </div>
        <div className="flex justify-between mb-4">
          <div className="text-sm">{text[0]}</div>
        </div>
        {/* likes and comms  */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center">
              <div
                onClick={() => setIsLiked(!isLiked)}
                className="flex items-center cursor-pointer"
              >
                {isLiked ? (
                  <img src={activeLike} alt="" />
                ) : (
                  <img src={like} alt="" />
                )}
                <div className="ml-1 mt-[3px]">{likesCount}</div>
              </div>
              <div
                onClick={() => setIsCommented(!isCommented)}
                className="flex items-center cursor-pointer ml-3"
              >
                {isCommented ? (
                  <img src={activeComment} alt="" />
                ) : (
                  <img src={comment} alt="" />
                )}
                <div className="ml-1 mt-[3px]">{commentsCount}</div>
              </div>
            </div>
          </div>
          <div
            onClick={() => setModalOpened(true)}
            className="text-sm hover:opacity-80 transition-opacity text-accent font-semibold cursor-pointer"
          >
            Читать
          </div>
        </div>
      </div>
      <Modal
        width="100%"
        height="max-content"
        maxWidth="calc(35% + 250px)"
        maxHeight="85%"
        padding="0"
        isOpened={modalOpened}
        setIsOpened={setModalOpened}
      >
        <div className="relative flex justify-center items-center w-full h-40 sm:h-60 overflow-hidden">
          <img
            src={photo}
            alt=""
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto"
          />
        </div>
        <div className="relative px-5 py-4 w-full bg-darkBlueGray mt-[-5px] z-10 rounded-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
            <div className="text-2xl font-semibold">{title}</div>
            <div className="opacity-70 text-sm">
              {moment(timestamp).calendar()}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-sm sm:text-base max-h-[450px] overflow-y-scroll">
              {text.map((item) => (
                <div
                  key={(Math.random() * 10).toString()}
                  className="mb-3 leading-6"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NewsCard;
