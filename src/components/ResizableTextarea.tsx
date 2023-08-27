import React, { useRef, useEffect } from "react";

import sendBtn from "../assets/img/messenger/sendBtn.svg";
import Tooltip from "./Tooltip";

type TProps = {
  value: string;
  setPictures: (file: File) => void;
  onChange: (newValue: string) => void;
  handleSend?: () => void;
  placeholder: string;
};

const ResizableTextarea: React.FC<TProps> = ({
  value,
  setPictures,
  onChange,
  handleSend,
  placeholder,
}) => {
  const postData = new FormData();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="relative pb-8 mb-2 bg-darkBlueGray rounded-xl overflow-hidden">
      <textarea
        ref={textareaRef}
        value={value}
        maxLength={1000}
        onChange={(event) => handleChange(event)}
        className="w-full resize-none p-3 pb-0 pr-9 text-sm outline-none bg-darkBlueGray  text-white placeholder:!text-[#ffffff90]"
        placeholder={placeholder}
      />
      <div
        onClick={handleSend}
        className="cursor-pointer group absolute bg-darkBlueGray top-[6px] right-[6px] rounded-md p-2"
      >
        <img
          className="group-hover:opacity-100 opacity-80 transition-opacity"
          src={sendBtn}
          alt=""
        />
      </div>
      <span className="absolute  overflow-hidden flex items-center justify-center rounded-md bg-darkBlueGray bottom-3 left-3">
        <label
          htmlFor="postPictures"
          className="relative cursor-pointer p-1 rounded-md opacity-80 transition hover:opacity-100"
        >
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="postPictures"
            onChange={(e) => setPictures(e.target.files![0])}
            placeholder="Изображение"
            className="appearance-none hidden"
          />

          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="18"
              viewBox="0 0 16 18"
              fill="none"
            >
              <path
                d="M14.0223 11.271L9.98372 15.1938C8.04294 17.0789 4.94815 17.0566 3.03474 15.1437C1.07602 13.1855 1.07561 10.0102 3.03382 8.05148C3.03953 8.04577 3.04525 8.04008 3.05098 8.03439L9.10091 2.04107C10.421 0.733325 12.5513 0.743337 13.859 2.06343C13.8659 2.07034 13.8727 2.07727 13.8795 2.08424C15.192 3.43238 15.1775 5.58507 13.8468 6.91533L7.74863 13.0115C7.11269 13.6473 6.09845 13.6976 5.40272 13.1279L5.30243 13.0458C4.63137 12.4963 4.5328 11.5069 5.08227 10.8358C5.11119 10.8005 5.14163 10.7664 5.17352 10.7338L9.27401 6.53276"
                stroke="#635BFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </label>
      </span>
    </div>
  );
};

export default ResizableTextarea;
