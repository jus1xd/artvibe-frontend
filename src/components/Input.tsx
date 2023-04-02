import React from "react";

type TProps = {
  type: "primary" | "secondary" | "auth";
  value: string;
  placeholder: string;
  hidden?: boolean;
  setValue: (value: string) => void;
};

const Input: React.FC<TProps> = ({ type, placeholder, hidden, value, setValue }) => {
  return (
    <input
      className="outline-none px-[15px] py-2 border border-inputBorder rounded-md"
      type={hidden ? "password" : "text"}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
    />
  );
};

export default Input;
