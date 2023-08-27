import React, { useState } from "react";

type TProps = {
  text: string;
  children: React.ReactNode;
};

const Tooltip: React.FC<TProps> = ({ text, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div
      className="tooltip-container relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {showTooltip && (
        <div className="tooltip absolute bottom-[110%] left-1/2 -translate-x-1/2 bg-accent text-[12px] rounded-lg  shadow-2xl  white py-1 px-2 whitespace-nowrap z-50">
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
