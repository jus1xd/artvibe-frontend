import React from "react";

type TProps = {
  text: string;
  type: "primary" | "secondary" | "accent";
  size: "sm" | "md" | "lg";
};

const Button: React.FC<TProps> = ({ text, type, size }) => {
  return type === "secondary" ? (
    size === "sm" ? (
      <button className="bg-[#ffffff40] text-[#fff] text-[14px] font-medium px-[15px] py-[5px] rounded-[50px]">
        {text}
      </button>
    ) : size === "md" ? (
      <button className="bg-[#ffffff50] text-[#fff] text-[16px] font-medium px-[15px] py-[5px] rounded-[50px]">
        {text}
      </button>
    ) : (
      <button className="bg-[#ffffff50] text-[#fff] text-[18px] font-medium px-[20px] py-[5px] rounded-[50px]">
        {text}
      </button>
    )
  ) : type === "accent" ? (
    size === "sm" ? (
      <button className="bg-accent text-[#fff] text-[14px] font-medium px-[15px] py-[5px] rounded-[50px]">
        {text}
      </button>
    ) : size === "md" ? (
      <button className="bg-accent text-[#fff] text-[16px] font-medium px-[15px] py-[5px] rounded-[50px]">
        {text}
      </button>
    ) : (
      <button className="bg-accent text-[#fff] text-[18px] font-medium px-[20px] py-[5px] rounded-[50px]">
        {text}
      </button>
    )
  ) : size === "sm" ? (
    <button className="bg-title text-[#fff] text-[14px] font-medium px-[15px] py-[5px] rounded-[50px]">
      {text}
    </button>
  ) : size === "md" ? (
    <button className="bg-title text-[#fff] text-[16px] font-medium px-[15px] py-[5px] rounded-[50px]">
      {text}
    </button>
  ) : (
    <button className="bg-title text-[#fff] text-[18px] font-medium px-[20px] py-[5px] rounded-[50px]">
      {text}
    </button>
  );
};

export default Button;
