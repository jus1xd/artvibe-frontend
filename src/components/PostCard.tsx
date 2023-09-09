import React, { useEffect, useRef, useState } from "react";
import moment from "moment";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { NavLink, useParams } from "react-router-dom";
import activeLike from "../assets/img/activeLike.svg";
import like from "../assets/img/like.svg";
import comment from "../assets/img/comment.svg";
import activeComment from "../assets/img/activeComment.svg";

import Modal from "./Modal";
import Tooltip from "./Tooltip";
import Dropdown from "./Dropdown";
import { postApi } from "../store/services/postService";
import jwt_decode from "jwt-decode";
import { IComment, ILike } from "../models/IPost";
import ResizableTextarea from "./ResizableTextarea";
import Avatar from "./Avatar";
import Comment from "./Comment";

// Define a service using a base URL and expected endpoints
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5003";

type TProps = {
  postId: string;
  createdAt: string;
  originId: string;
  authorId: string;
  authorAvatar?: string;
  authorName: string;
  text: string;
  pictures?: string;
  likes: ILike[];
  comments: IComment[];
  deletePostHandler: (postId: string) => void;
  isPostLoading: boolean;
};

const PostCard: React.FC<TProps> = ({
  postId,
  createdAt,
  originId,
  authorId,
  authorAvatar,
  authorName,
  text,
  pictures,
  likes,
  comments,
  deletePostHandler,
  isPostLoading,
}) => {
  // получить токен из localStorage
  const token = localStorage.getItem("token");
  // @ts-ignore
  const currentUser = token ? jwt_decode(token).id : null;

  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(
    likes
      ? likes.findIndex((like) => like.userId === currentUser) !== -1
      : false
  );
  const [commentInputOpened, setCommentInputOpened] = useState<boolean>(false);
  const [postLikes, setPostLikes] = useState<any[]>(likes);
  const [postComments, setPostComments] = useState<any[]>(comments);
  const [postRateLoading, setPostRateLoading] = useState<boolean>(false);
  const [newCommentValue, setNewCommentValue] = useState<string>("");
  const [newCommentPictures, setNewCommentPictures] = useState<File | null>(
    null
  );

  // работа с изображениями
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const dropdownOptions = ["Удалить", "Редактировать"];

  const isMyPost = currentUser === authorId;

  // запросы для постов
  const [likePost] = postApi.useLikePostMutation();
  const [addComment] = postApi.useAddCommentMutation();

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

  const likeHandler = async () => {
    if (!postRateLoading) {
      if (isLiked) {
        setPostLikes(postLikes.filter((like) => like.userId !== currentUser));
        setIsLiked(false);
        setPostRateLoading(true);
        await likePost({ originId, postId, userId: currentUser }).then(() =>
          setPostRateLoading(false)
        );
      } else {
        setPostLikes([...postLikes, { userId: currentUser, postId: postId }]);
        setIsLiked(true);
        setPostRateLoading(true);
        await likePost({ originId, postId, userId: currentUser }).then(() =>
          setPostRateLoading(false)
        );
      }
    }
  };

  const addCommentHandler = () => {
    // formData для отправки картинки
    const addCommentData = new FormData();
    addCommentData.append("originId", originId);
    addCommentData.append("postId", postId);
    addCommentData.append("userId", currentUser);
    addCommentData.append("text", newCommentValue);
    addCommentData.append("pictures", newCommentPictures!);
    addComment(addCommentData).then((res: any) => {
      setNewCommentValue("");
      setNewCommentPictures(null);
      setPostComments([...postComments, res.data]);
    });
  };

  return (
    <div
      className="sm:mr-4 sm:w-full
      py-3 px-5 mb-2 relative  bg-darkBlueGray w-full min-w-[220px] rounded-xl flex flex-col group"
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
            <Avatar avatar={authorAvatar} width="40px" height="40px"/>
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
                <div className="text-accent w-full text-sm max-w-[100px] whitespace-nowrap overflow-hidden text-ellipsis">
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
      <div className="">
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
              <div className="relative w-max break-word">{text}</div>
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
        {/* likes and comms  */}
        <div className="select-none flex items-center justify-between mt-3">
          <div className="flex items-center">
            <div className="flex items-center">
              <div
                onClick={() => likeHandler()}
                className={`flex items-center cursor-pointer px-1 rounded-lg ${
                  isLiked ? "bg-redOpacity text-red" : ""
                } `}
              >
                {isLiked ? (
                  <img src={activeLike} alt="" />
                ) : (
                  <img src={like} alt="" />
                )}
                <div className="mx-1 mt-[3px]">{postLikes.length}</div>
              </div>
              <div
                onClick={() => setCommentInputOpened(!commentInputOpened)}
                className="flex items-center cursor-pointer ml-3"
              >
                {commentInputOpened ? (
                  <img src={activeComment} alt="" />
                ) : (
                  <img src={comment} alt="" />
                )}
                <div className="ml-1 mt-[3px]">{postComments.length}</div>
              </div>
            </div>
          </div>
        </div>
        {/* comments  */}
        <div className="">
          {postComments.map((comment: IComment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </div>
        {/* add comment  */}
        {commentInputOpened && (
          <div className="w-full rounded-lg overflow-hidden mt-2">
            <ResizableTextarea
              handleSend={() => addCommentHandler()}
              value={newCommentValue}
              onChange={setNewCommentValue}
              pictures={newCommentPictures}
              setPictures={setNewCommentPictures}
              placeholder="Написать комментарий..."
              color="bg-darkBackground"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
