import React from "react";
import { NavLink } from "react-router-dom";

type TProps = {
  img: string;
  link?: string;
  size: string;
  title: string;
  subtitle: string;
  useMargin?: boolean;
};

const Card: React.FC<TProps> = ({
  img,
  link,
  size,
  title,
  subtitle,
  useMargin,
}) => {
  return size === "lg" ? (
    <div className="relative group cursor-pointer w-[calc(50%-10px)] h-[310px] rounded-xl overflow-hidden">
      {link ? (
        <NavLink to={link}>
          <div className="absolute top-0 left-0 w-full h-full z-20 bg-gradient-to-t from-[#000000ee] to-[#ffffff00]"></div>
        </NavLink>
      ) : (
        <div className="absolute top-0 left-0 w-full h-full z-20 bg-gradient-to-t from-[#000000ee] to-[#ffffff00]"></div>
      )}
      <img className="absolute top-0 left-0 w-full z-10 transition-transform duration-500 transform-gpu group-hover:scale-125" src={img} alt="pic" />
      {link ? (
        <NavLink to={link}>
          <div className="absolute left-4 bottom-4 z-30">
            <p className="text-white text-lg font-medium">{title}</p>
            <p className="text-white">{subtitle}</p>
          </div>
        </NavLink>
      ) : (
        <div className="absolute left-4 bottom-4 z-30">
          <p className="text-white text-lg font-medium">{title}</p>
          <p className="text-white">{subtitle}</p>
        </div>
      )}
    </div>
  ) : size === "xs" ? (
    <div className={`${useMargin && "mr-[10px]"} relative group mb-3 cursor-pointer w-[calc(20%-10px)] h-[149px] rounded-xl overflow-hidden`}>
      {link ? (
        <NavLink to={link}>
          <div className="absolute top-0 left-0 w-full h-full z-20 bg-gradient-to-t from-[#000000ee] to-[#ffffff00]"></div>
        </NavLink>
      ) : (
        <div className="absolute top-0 left-0 w-full h-full z-20 bg-gradient-to-t from-[#000000ee] to-[#ffffff00]"></div>
      )}
      <img className="absolute top-0 left-0 w-full z-10 transition-transform duration-500 transform-gpu group-hover:scale-125" src={img} alt="pic" />
      {link ? (
        <NavLink to={link}>
          <div className="absolute left-4 bottom-4 z-30">
            <p className="text-white text-md font-medium">{title}</p>
            <p className="text-white text-sm">{subtitle}</p>
          </div>
        </NavLink>
      ) : (
        <div className="absolute left-4 bottom-4 z-30">
          <p className="text-white text-md font-medium">{title}</p>
          <p className="text-white text-sm">{subtitle}</p>
        </div>
      )}
    </div>
  ) : size === "sm" ? (
    <div
      className={`${
        useMargin && "mr-[10px]"
      } relative group cursor-pointer w-[calc(20%-10px)] mb-5 h-[310px] rounded-xl overflow-hidden`}
    >
      {link ? (
        <NavLink to={link}>
          <div className="absolute top-0 left-0 w-full h-full z-20 bg-gradient-to-t from-[#000000ee] to-[#ffffff00]"></div>
        </NavLink>
      ) : (
        <div className="absolute top-0 left-0 w-full h-full z-20 bg-gradient-to-t from-[#000000ee] to-[#ffffff00]"></div>
      )}
      <div className="d-flex h-full items-center justify-center absolute top-0 left-0 z-10">
        <img
          className="h-full object-cover transition-transform duration-500 transform-gpu group-hover:scale-125"
          // src={`http://localhost:5003/${img}`}
          src={`https://artvibeapi.onrender.com/${img}`}
          alt="pic"
        />
      </div>
      {link ? (
        <NavLink to={link}>
          <div className="absolute left-4 bottom-4 z-30">
            <p className="text-white font-medium">{title}</p>
            <p className="text-white text-sm w-full pr-4">{subtitle}</p>
          </div>
        </NavLink>
      ) : (
        <div className="absolute left-4 bottom-4 z-30">
          <p className="text-white font-medium">{title}</p>
          <p className="text-white text-sm w-full pr-4">{subtitle}</p>
        </div>
      )}
    </div>
  ) : null;
};

export default Card;
