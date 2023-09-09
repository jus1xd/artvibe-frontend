import React, { useEffect, useState } from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { NavLink } from "react-router-dom";
import { IFriend } from "../models/IFriend";
import Avatar from "./Avatar";

// Define a service using a base URL and expected endpoints
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5003";

type TProps = {
  noMargin?: boolean;
  dataFriend: IFriend;
  clientId: string;
  isFriend: boolean;
  addToFriendsHandler: (
    setIsFriendLoading: React.Dispatch<React.SetStateAction<boolean>>,
    dataForFriendsActions: FormData,
    peopleId: string
  ) => void;
  removeFromFriendsHandler: (
    setIsFriendLoading: React.Dispatch<React.SetStateAction<boolean>>,
    dataForFriendsActions: FormData,
    peopleId: string
  ) => void;
};

const PeopleCard: React.FC<TProps> = ({
  noMargin,
  dataFriend,
  clientId,
  isFriend,
  addToFriendsHandler,
  removeFromFriendsHandler,
}) => {
  const [isFriendLoading, setIsFriendLoading] = useState<boolean>(false);

  const { _id: peopleId, name, avatar, isOnline } = dataFriend;

  // form data для добавления/удаления из друзей
  const dataForFriendsActions = new FormData();

  dataForFriendsActions.append("userId", clientId);
  dataForFriendsActions.append("friendId", peopleId);

  const addFriend = () => {
    setIsFriendLoading(true);
    addToFriendsHandler(setIsFriendLoading, dataForFriendsActions, peopleId);
  };

  const removeFriend = () => {
    setIsFriendLoading(true);
    removeFromFriendsHandler(
      setIsFriendLoading,
      dataForFriendsActions,
      peopleId
    );
  };

  return (
    <div
      className={`${
        noMargin ? "" : "sm:mr-2 sm:w-[calc(25%-8px)]"
      } p-2 mb-2 bg-darkBlueGray w-full min-w-[220px] h-[56px] rounded-xl flex items-center`}
    >
      <NavLink className="relative z-[0] h-[40px] flex items-center" to={`/${peopleId}`}>
        {isFriendLoading ? (
          <Skeleton
            circle
            width={40}
            height={40}
            baseColor="#3B3D42"
            highlightColor="#7B808C"
            style={{ marginTop: "-4px" }}
          />
        ) : avatar ? (
          <div className="relative z-[0]">
            <Avatar avatar={avatar} width="40px" height="40px" />
            <div className="online-status">
              {isOnline && (
                <div className="w-3 h-3 rounded-full bg-accent border-2 border-darkBlueGray absolute bottom-0 right-0 z-10"></div>
              )}
            </div>
          </div>
        ) : (
          <div
            className={`flex items-center justify-center overflow-hidden w-[40px] h-[40px] rounded-full`}
            style={{ backgroundColor: "#ffffff30" }}
          >
            <div className="text-sm text-white font-bold">
              {name.slice(0, 1).toUpperCase()}
            </div>
          </div>
        )}
      </NavLink>

      <div className="w-[calc(100%-40px)] flex justify-between items-center">
        <NavLink to={`/${peopleId}`}>
          <div className="">
            <div className="ml-2 flex items-center">
              {isFriendLoading ? (
                <Skeleton
                  width={100}
                  height={15}
                  baseColor="#3B3D42"
                  highlightColor="#7B808C"
                  className="mb-[-4]"
                />
              ) : (
                <div className="w-full max-w-[100px] whitespace-nowrap overflow-hidden text-ellipsis">
                  {name}
                </div>
              )}
              {/* {isFriendLoading ? (
              <Skeleton
                width={140}
                height={15}
                baseColor="#3B3D42"
                highlightColor="#7B808C"
              />
            ) : (
              <div>{email}</div>
            )} */}
            </div>
          </div>
        </NavLink>
        <div>
          {isFriendLoading ? (
            <button className="flex items-center bg-gray-500 h-[40px] mt-[-4px] ml-4 text-white">
              <Skeleton
                width={40}
                height={40}
                baseColor="#3B3D42"
                highlightColor="#7B808C"
                className="!rounded-md overflow-hidden"
              />
            </button>
          ) : isFriend ? (
            <button
              onClick={() => removeFriend()}
              className="bg-redOpacity opacity-70 ml-4 hover:opacity-100 transition-opacity rounded-md p-2 text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 17 17"
                fill="none"
              >
                <path
                  className="w-6 h-6 p-1"
                  d="M8.5 17C9.61624 17 10.7215 16.7801 11.7528 16.353C12.7841 15.9258 13.7211 15.2997 14.5104 14.5104C15.2997 13.7211 15.9258 12.7841 16.353 11.7528C16.7801 10.7215 17 9.61624 17 8.5C17 7.38376 16.7801 6.27846 16.353 5.24719C15.9258 4.21592 15.2997 3.27889 14.5104 2.48959C13.7211 1.70029 12.7841 1.07419 11.7528 0.647024C10.7215 0.219859 9.61624 -1.66332e-08 8.5 0C6.24566 3.35923e-08 4.08365 0.895533 2.48959 2.48959C0.895533 4.08365 0 6.24566 0 8.5C0 10.7543 0.895533 12.9163 2.48959 14.5104C4.08365 16.1045 6.24566 17 8.5 17ZM12.9 13.95C11.555 15.0282 9.85937 15.5721 8.13813 15.4776C6.41688 15.3831 4.79104 14.6568 3.5721 13.4379C2.35317 12.219 1.62687 10.5931 1.53237 8.87187C1.43788 7.15063 1.98183 5.45505 3.06 4.11L12.89 13.95H12.9ZM13.95 12.89L4.11 3.05C5.45505 1.97183 7.15063 1.42788 8.87187 1.52237C10.5931 1.61687 12.219 2.34317 13.4379 3.5621C14.6568 4.78104 15.3831 6.40688 15.4776 8.12813C15.5721 9.84937 15.0282 11.545 13.95 12.89Z"
                  fill="#FF5B5B"
                />
              </svg>
            </button>
          ) : (
            <button
              onClick={() => addFriend()}
              className="bg-accentOpacity opacity-70 ml-4 hover:opacity-100 transition-opacity rounded-md p-2 text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13 11H19.5C19.7652 11 20.0196 11.1054 20.2071 11.2929C20.3946 11.4804 20.5 11.7348 20.5 12C20.5 12.2652 20.3946 12.5196 20.2071 12.7071C20.0196 12.8946 19.7652 13 19.5 13H13V19.5C13 19.7652 12.8946 20.0196 12.7071 20.2071C12.5196 20.3946 12.2652 20.5 12 20.5C11.7348 20.5 11.4804 20.3946 11.2929 20.2071C11.1054 20.0196 11 19.7652 11 19.5V13H4.5C4.23478 13 3.98043 12.8946 3.79289 12.7071C3.60536 12.5196 3.5 12.2652 3.5 12C3.5 11.7348 3.60536 11.4804 3.79289 11.2929C3.98043 11.1054 4.23478 11 4.5 11H11V4.5C11 4.23478 11.1054 3.98043 11.2929 3.79289C11.4804 3.60536 11.7348 3.5 12 3.5C12.2652 3.5 12.5196 3.60536 12.7071 3.79289C12.8946 3.98043 13 4.23478 13 4.5V11Z"
                  fill="#635BFF"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PeopleCard;
