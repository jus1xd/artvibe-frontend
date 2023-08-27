import React, { useEffect, useRef, useState } from "react";
import moment from "moment";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { NavLink, useParams } from "react-router-dom";
import activeLike from "../assets/img/activeLike.svg";
import like from "../assets/img/like.svg";
import activeComment from "../assets/img/activeComment.svg";
import comment from "../assets/img/comment.svg";

import Modal from "./Modal";
import Tooltip from "./Tooltip";
import Dropdown from "./Dropdown";
import { postApi } from "../store/services/postService";
import jwt_decode from "jwt-decode";

// Define a service using a base URL and expected endpoints
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5003";

type TProps = {
  postId: string;
  createdAt: string;
  isMyPost: boolean;
  authorId: string;
  authorAvatar?: string;
  authorName: string;
  text: string;
  pictures?: string;
  likesCount: number;
  commentsCount: number;
  deletePostHandler: (postId: string) => void;
  isPostLoading: boolean;
};

const PostCard: React.FC<TProps> = ({
  postId,
  createdAt,
  isMyPost,
  authorId,
  authorAvatar,
  authorName,
  text,
  pictures,
  likesCount,
  commentsCount,
  deletePostHandler,
  isPostLoading,
}) => {
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isCommented, setIsCommented] = useState<boolean>(false);
  const imgRef = useRef(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const dropdownOptions = ["Удалить", "Редактировать"];

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

  const deletePost = () => {
    deletePostHandler(postId);
  };

  return (
    <div
      className="sm:mr-4 sm:w-full
      p-3 mb-2 relative bg-darkBlueGray w-full min-w-[220px] rounded-xl flex flex-col group"
    >
      {/* dots menu */}
      {isMyPost && (
        <Dropdown
          title="Выберите опцию"
          options={dropdownOptions}
          deleteHandler={deletePost}
        />
      )}

      <div className="flex items-center h-10 mb-2">
        {/* avatar  */}
        <NavLink className="flex items-center" to={`/${authorId}`}>
          {isPostLoading ? (
            <Skeleton
              circle
              width={40}
              height={40}
              baseColor="#3B3D42"
              highlightColor="#7B808C"
              style={{ marginTop: "-4px" }}
            />
          ) : authorAvatar ? (
            <div className="flex items-center justify-center w-[40px] h-[40px] overflow-hidden rounded-full">
              <img
                src={`${baseUrl}/${authorAvatar}`}
                className="scale-[1.5]"
                alt="avatar"
              />
            </div>
          ) : (
            <div
              className={`flex items-center justify-center overflow-hidden w-[40px] h-[40px] rounded-full`}
              style={{ backgroundColor: "#ffffff30" }}
            >
              <div className="text-sm text-white font-bold">
                {authorName.slice(0, 1).toUpperCase()}
              </div>
            </div>
          )}
        </NavLink>

        {/* name  */}
        <NavLink to={`/${authorId}`}>
          <div className="ml-2 flex items-center">
            {isPostLoading ? (
              <Skeleton
                width={100}
                height={15}
                baseColor="#3B3D42"
                highlightColor="#7B808C"
                className="mb-[-4]"
              />
            ) : (
              <div className="flex flex-col">
                <div className="w-full text-sm max-w-[100px] whitespace-nowrap overflow-hidden text-ellipsis">
                  {authorName}
                </div>
                <Tooltip text={moment(createdAt).format("LLL")}>
                  <div className="text-[12px] mt-[-2px] opacity-80">
                    {moment(createdAt).fromNow()}
                  </div>
                </Tooltip>
              </div>
            )}
          </div>
        </NavLink>
      </div>

      {/* post text  */}
      <div className="ml-12">
        {text.length > 0 && (
          <div className="mt-1 text-sm flex mb-2">
            {isPostLoading ? (
              <Skeleton
                width={100}
                height={15}
                baseColor="#3B3D42"
                highlightColor="#7B808C"
                className="mb-[-4]"
              />
            ) : (
              <div className="w-full break-word">{text}</div>
            )}
          </div>
        )}
        {pictures && width > 0 && height > 0 && (
          <div className="flex">
            {/* 1photo */}
            <div
              style={{
                width: width,
                height: height,
                maxWidth: "350px",
                maxHeight: "230px",
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
            <Modal isOpened={modalOpened} setIsOpened={setModalOpened}>
              <div className="flex justify-center items-center h-full">
                <img
                  src={`${baseUrl}/${pictures}`}
                  alt="post"
                  className="max-h-full h-max"
                />
              </div>
            </Modal>
          </div>
        )}
        {/* likes and comms  */}
        <div className="flex items-center justify-between mt-2">
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
        </div>
      </div>
    </div>
  );
};

export default PostCard;
