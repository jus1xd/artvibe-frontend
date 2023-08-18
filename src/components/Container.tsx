import React from "react";

type TProps = {
  children: React.ReactNode;
  border?: boolean;
  lBorder?: boolean;
  noBorder?: boolean;
};

const Container: React.FC<TProps> = ({
  children,
  lBorder,
  border,
  noBorder,
}) => {
  return border ? (
    <div className="max-w-[1200px] bg-gradient-to-b from-white via-[#22222220] to-white w-full px-[1px] mx-auto">
      <div className="bg-white px-[14px] w-full">{children}</div>
    </div>
  ) : lBorder ? (
    <div className="max-w-[1200px] bg-gradient-to-b from-white via-[#22222220] to-white w-full pl-[1px] mx-auto">
      <div className="bg-white px-[14px] w-full">{children}</div>
    </div>
  ) : (
    <div
      className={`max-w-[1200px] w-full ${noBorder ? "" : "px-[15px]"} mx-auto`}
    >
      {children}
    </div>
  );
};

export default Container;
