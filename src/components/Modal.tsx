import React from "react";

type TProps = {
  width: string;
  height: string;
  maxWidth?: string;
  maxHeight?: string;
  noBackground?: boolean;
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
  noBackground,
  padding,
  isOpened,
  setIsOpened,
  children,
}) => {
  // получить ширину экрана устройства
  const widthScreen = window.innerWidth;
  // получить высоту экрана устройства

  return (
    <div
      className={`${
        isOpened ? "visible opacity-100" : "invisible opacity-0"
      } transition-all fixed inset-0 flex items-center justify-center z-50`}
    >
      <div
        className={`modal-overlay fixed inset-0 bg-black sm:opacity-50`}
        onClick={() => setIsOpened(false)}
      ></div>
      <div
        style={{
          width: widthScreen < 500 ? "100%" : width,
          height: height,
          maxWidth: widthScreen < 500 ? "100%" : maxWidth,
          maxHeight,
        }}
        className={`${
          isOpened ? "scale-100" : "scale-75"
        } mt-[-70px] sm:mt-0 transition-transform modal-container ${
          !noBackground && "bg-darkBlueGray shadow-lg"
        }  p-[${padding}] rounded-lg overflow-hidden  z-10`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
