import React from "react";

const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5003";

type TProps = {
  width?: string;
  height?: string;
  avatar: string;
};

type ImageStyle = {
  objectFit: "cover" | "contain" | "fill" | "none" | "scale-down";
  width: string;
  height: string;
};

const Avatar: React.FC<TProps> = ({ avatar, width, height }) => {
  const avatarStyle = {
    width: width || "50px",
    height: height || "50px",
    borderRadius: "50%", // Задаем скругленные углы, чтобы сделать изображение круглым
    overflow: "hidden", // Обрезаем изображение, чтобы оно вписывалось в круг
  };

  const imageStyle: ImageStyle = {
    objectFit: "cover", // Сохраняем соотношение сторон и заполняем весь круг
    width: "100%",
    height: "100%",
  };

  return (
    <div
      style={avatarStyle}
      className={`avatar flex items-center justify-center rounded-full overflow-hidden`}
    >
      <img
        style={imageStyle}
        className="scale-[1.5]"
        src={`${baseUrl}/${avatar}`}
        alt="Avatar"
      />
    </div>
  );
};

export default Avatar;
