import React from "react";

type TProps = {
  width: string;
  height: string;
  maxWidth?: string;
  maxHeight?: string;
  padding?: string;
  isOpened: boolean;
  setIsOpened: (isOpened: boolean) => void;
  children: React.ReactNode;
};

const Modal: React.FC<TProps> = ({
  width,
  height,
  maxWidth,
  maxHeight,
  padding,
  isOpened,
  setIsOpened,
  children,
}) => {
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
        style={{ width: width, height: height, maxWidth, maxHeight }}
        className={`${
          isOpened ? "scale-100" : "scale-75"
        } transition-transform modal-container bg-darkBlueGray p-[${padding}] rounded-lg overflow-hidden shadow-lg z-10`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
