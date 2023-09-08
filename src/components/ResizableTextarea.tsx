import React, { useRef, useEffect } from "react";

import sendBtn from "../assets/img/messenger/sendBtn.svg";
import Tooltip from "./Tooltip";

type TProps = {
  value: string;
  pictures: File | null;
  setPictures: (file: File | null) => void;
  onChange: (newValue: string) => void;
  handleSend: () => void;
  placeholder: string;
  color?: string;
};

const ResizableTextarea: React.FC<TProps> = ({
  value,
  pictures,
  setPictures,
  onChange,
  handleSend,
  placeholder,
  color,
}) => {
  const areaId = Math.random().toString(36);
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

  const localSendHandler = () => {
    if (value || pictures) {
      handleSend();
    }
  };

  return (
    <div
      className={`relative pb-8 mb-2 ${
        color ? color : "bg-darkBlueGray"
      } rounded-xl overflow-hidden`}
    >
      <textarea
        ref={textareaRef}
        value={value}
        maxLength={1000}
        onChange={(event) => handleChange(event)}
        className={`w-full resize-none p-3 pb-0 pr-9 text-sm outline-none ${
          color ? color : "bg-darkBlueGray"
        }   text-white placeholder:!text-[#ffffff90]`}
        placeholder={placeholder}
      />
      {/* preload img */}
      {pictures && (
        <div className="relative w-max m-3 group overflow-hidden rounded-lg">
          {pictures && (
            <img
              className="w-20 h-20 object-cover rounded-md"
              src={URL.createObjectURL(pictures)}
              alt=""
            />
          )}
          <div
            onClick={(e) => setPictures(null)}
            className="bg-[#FF5B5B20] flex items-center justify-center absolute z-10 inset-0 group-hover:visible invisible w-full h-full cursor-pointer"
          >
            <div className="bg-red p-1 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 17 17"
                fill="none"
              >
                <path
                  className="w-6 h-6 p-1"
                  d="M8.5 17C9.61624 17 10.7215 16.7801 11.7528 16.353C12.7841 15.9258 13.7211 15.2997 14.5104 14.5104C15.2997 13.7211 15.9258 12.7841 16.353 11.7528C16.7801 10.7215 17 9.61624 17 8.5C17 7.38376 16.7801 6.27846 16.353 5.24719C15.9258 4.21592 15.2997 3.27889 14.5104 2.48959C13.7211 1.70029 12.7841 1.07419 11.7528 0.647024C10.7215 0.219859 9.61624 -1.66332e-08 8.5 0C6.24566 3.35923e-08 4.08365 0.895533 2.48959 2.48959C0.895533 4.08365 0 6.24566 0 8.5C0 10.7543 0.895533 12.9163 2.48959 14.5104C4.08365 16.1045 6.24566 17 8.5 17ZM12.9 13.95C11.555 15.0282 9.85937 15.5721 8.13813 15.4776C6.41688 15.3831 4.79104 14.6568 3.5721 13.4379C2.35317 12.219 1.62687 10.5931 1.53237 8.87187C1.43788 7.15063 1.98183 5.45505 3.06 4.11L12.89 13.95H12.9ZM13.95 12.89L4.11 3.05C5.45505 1.97183 7.15063 1.42788 8.87187 1.52237C10.5931 1.61687 12.219 2.34317 13.4379 3.5621C14.6568 4.78104 15.3831 6.40688 15.4776 8.12813C15.5721 9.84937 15.0282 11.545 13.95 12.89Z"
                  fill="#ffffff"
                />
              </svg>
            </div>
          </div>
        </div>
      )}

      <div
        onClick={localSendHandler}
        className={`cursor-pointer group absolute ${
          color ? color : "bg-darkBlueGray"
        } top-[6px] right-[6px] rounded-md p-2`}
      >
        <img
          className="group-hover:opacity-100 opacity-80 transition-opacity"
          src={sendBtn}
          alt=""
        />
      </div>
      <span
        className={`absolute overflow-hidden flex items-center justify-center rounded-md ${
          color ? color : "bg-darkBlueGray"
        } bottom-3 left-3`}
      >
        <label
          htmlFor={areaId + "postPicture"}
          className="relative cursor-pointer p-1 rounded-md opacity-80 transition hover:opacity-100"
        >
          <input
            type="file"
            accept="image/png, image/jpeg"
            id={areaId + "postPicture"}
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
