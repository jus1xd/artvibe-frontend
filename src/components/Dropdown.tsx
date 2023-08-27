import React, { useEffect, useRef, useState } from "react";
import dots from "../assets/img/dots.svg";

interface DropdownProps {
  title: string;
  options: string[];
  deleteHandler: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  title,
  options,
  deleteHandler,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleOptionClick = (option: string) => {
    if (option === "Удалить") {
      deleteHandler();
    } else {
      console.log(`Выбрана опция: ${option}`);
    }
  };

  const handleMenuMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMenuMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div className="group-hover:opacity-100 opacity-0 inline-block transition-all dropdown relative">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex absolute top-0 right-0 cursor-pointer"
      >
        <img src={dots} alt="" />
      </div>

      {isOpen && (
        <div
          ref={menuRef}
          onMouseEnter={handleMenuMouseEnter}
          onMouseLeave={handleMenuMouseLeave}
          className="dropdown-menu absolute top-4 right-0 mt-2 py-1 bg-[#ffffff10] rounded-lg shadow"
        >
          {options.map((option, index) => (
            <div
              key={index}
              className="text-sm text-center px-2 py-1 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
