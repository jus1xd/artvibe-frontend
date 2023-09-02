import React from "react";

type TProps = {
  children: React.ReactNode;
};

const ProfileWrapper: React.FC<TProps> = ({ children }) => {
  return (
    <div className="messenger-content sm:w-[calc(100%-232px)] h-full max-h-[600px]  text-white justify-between">
      {children}
    </div>
  );
};

export default ProfileWrapper;
