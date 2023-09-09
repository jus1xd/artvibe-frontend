import React from "react";

type TProps = {
  children: React.ReactNode;
};

const ProfileWrapper: React.FC<TProps> = ({ children }) => {
  return (
    <div className="messenger-content h-[calc(100vh-180px)] sm:w-[calc(100%-232px)] sm:h-[calc(100vh-232px)]  text-white justify-between">
      {children}
    </div>
  );
};

export default ProfileWrapper;
