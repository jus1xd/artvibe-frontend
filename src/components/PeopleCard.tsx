import React from "react";

import addToFriendsIcon from "../assets/img/peoples/add.svg";
import removeFromFriendsIcon from "../assets/img/peoples/remove.svg";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type TProps = {
  peopleId: string;
  clientId: string;
  avatar?: string;
  name: string;
  email: string;
  isFriend: boolean;
  isFriendLoading?: boolean;
  addToFriendsHandler?: (
    dataForFriendsActions: FormData,
    peopleId: string
  ) => void;
  removeFromFriendsHandler?: (
    dataForFriendsActions: FormData,
    peopleId: string
  ) => void;
};

const PeopleCard: React.FC<TProps> = ({
  peopleId,
  clientId,
  avatar,
  name,
  email,
  isFriend,
  isFriendLoading,
  addToFriendsHandler,
  removeFromFriendsHandler,
}) => {
  // form data для добавления/удаления из друзей
  const dataForFriendsActions = new FormData();
  dataForFriendsActions.append("userId", clientId);
  dataForFriendsActions.append("friendId", peopleId);

  return (
    <div className="p-3 mb-4 bg-darkBlueGray mr-4 min-w-[240px] w-[calc(25%-16px)] rounded-xl flex items-center">
      {isFriendLoading ? (
        <Skeleton
          circle
          width={40}
          height={40}
          baseColor="#3B3D42"
          highlightColor="#7B808C"
          className="mb-[4px]"
        />
      ) : (
        <img src={avatar} className="w-10" />
      )}
      <div className="w-full flex justify-between items-center">
        <div className="ml-2">
          {isFriendLoading ? (
            <Skeleton
              width={140}
              height={15}
              baseColor="#3B3D42"
              highlightColor="#7B808C"
            />
          ) : (
            <div>{name}</div>
          )}
          {isFriendLoading ? (
            <Skeleton
              width={140}
              height={15}
              baseColor="#3B3D42"
              highlightColor="#7B808C"
            />
          ) : (
            <div>{email}</div>
          )}
        </div>
        <div>
          {isFriendLoading ? (
            <Skeleton
              width={40}
              height={40}
              baseColor="#3B3D42"
              highlightColor="#7B808C"
              className="mb-[4px]"
            />
          ) : isFriend ? (
            <button
              // @ts-ignore
              onClick={() =>
                removeFromFriendsHandler!(dataForFriendsActions, peopleId)
              }
              className="bg-redOpacity opacity-70 ml-4 hover:opacity-100 transition-all rounded-md p-2 text-white"
            >
              <img className="w-6" src={removeFromFriendsIcon} alt="" />
            </button>
          ) : (
            <button
              // @ts-ignore
              onClick={() =>
                addToFriendsHandler!(dataForFriendsActions, peopleId)
              }
              className="bg-accentOpacity opacity-70 ml-4 hover:opacity-100 transition-all rounded-md p-2 text-white"
            >
              <img className="w-6" src={addToFriendsIcon} alt="" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PeopleCard;
