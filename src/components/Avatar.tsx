import React from "react";

const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5003";

type TProps = {
  width?: string;
  height?: string;
  avatar: string;
};

const Avatar: React.FC<TProps> = ({ avatar, width, height }) => {
  return (
    <div
      style={{ width: width || "50px", height: height || "50px" }}
      className={`avatar flex items-center justify-center rounded-full overflow-hidden`}
    >
      <img className="scale-125" src={`${baseUrl}/${avatar}`} alt="Avatar" />
    </div>
  );
};

export default Avatar;
