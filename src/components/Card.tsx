import React from "react";

type TProps = {
  img: string;
  size: string;
  title: string;
  subtitle: string;
};

const Card: React.FC<TProps> = ({ img, size, title, subtitle }) => {
  return size === "lg" ? (
    <div className="relative w-[calc(50%-10px)] h-[310px] rounded-xl overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-20 bg-gradient-to-t from-[#000000ee] to-[#ffffff00]"></div>
      <img className="absolute top-0 left-0 w-full z-10" src={img} alt="pic" />
      <div className="absolute left-4 bottom-4 z-30">
        <p className="text-white text-lg font-medium">{title}</p>
        <p className="text-white">{subtitle}</p>
      </div>
    </div>
  ) : size === "sm" ? (
    <div className="relative w-[calc(20%-10px)] mb-5 h-[310px] rounded-xl overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-20 bg-gradient-to-t from-[#000000ee] to-[#ffffff00]"></div>
      <img className="absolute top-0 left-0 w-full z-10" src={img} alt="pic" />
      <div className="absolute left-4 bottom-4 z-30">
        <p className="text-white font-medium">{title}</p>
        <p className="text-white text-sm w-full pr-4">{subtitle}</p>
      </div>
    </div>
  ) : null;
};

export default Card;
