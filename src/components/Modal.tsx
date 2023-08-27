import React from "react";

type TProps = {
  isOpened: boolean;
  setIsOpened: (isOpened: boolean) => void;
  children: React.ReactNode;
};

const Modal: React.FC<TProps> = ({ isOpened, setIsOpened, children }) => {
  return (
    <div
      className={`${
        isOpened ? "visible opacity-100" : "invisible opacity-0"
      } transition-all fixed inset-0 flex items-center justify-center z-50`}
    >
      <div
        className={`modal-overlay fixed inset-0 bg-black opacity-50`}
        onClick={() => setIsOpened(false)}
      ></div>
      <div
        className={`${
          isOpened ? "scale-100" : "scale-75"
        } transition-transform modal-container bg-darkBlueGray max-w-[60%] max-h-[65%] w-[60%] h-[65%] p-5 rounded-lg shadow-lg z-10`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
