import React from "react";
import { NavLink } from "react-router-dom";

type TProps = {
  idOfFriend: string;
  avatar?: string;
  name?: string;
  message?: string;
};

const DialogCard: React.FC<TProps> = ({
  idOfFriend,
  avatar,
  name,
  message,
}) => {
  return (
    <NavLink to={`/im/${idOfFriend}`} className="w-full">
      <div className="w-full h-full rounded-lg overflow-hidden mb-1 px-3 py-2 hover:bg-darkBackground transition-colors">
        <div className="flex items-center w-full">
          <div className={`flex items-center justify-center overflow-hidden min-w-[35px] min-h-[35px] rounded-full`} style={{backgroundColor: avatar}}>
            {/* <img src={avatar} alt="" /> */}
            <div className="text-sm text-white font-bold">{name!.slice(0, 2).toUpperCase()}</div>
          </div>
          <div className="flex flex-col ml-2 w-full">
            <div className="font-bold text-sm">{name}</div>
            <div className="text-sm w-full whitespace-nowrap overflow-hidden text-ellipsis ">
              {message}
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default DialogCard;
