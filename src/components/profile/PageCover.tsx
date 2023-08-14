import React, { useEffect, useState } from "react";
import { userApi } from "../../store/services/userService";

type TProps = {
  userId: string;
  pageCover: string;
  avatar: string;
  isMyProfile: boolean;
};

const PageCover: React.FC<TProps> = ({
  userId,
  pageCover,
  avatar,
  isMyProfile,
}) => {
  const [currentPageCover, setCurrentPageCover] = useState<string>(pageCover);
  const [newPageCover, setNewPageCover] = useState<File | null>(null);
  const imageUrl = `http://localhost:5003/${avatar}`;

  // обновить шапку пользователя запросом

  const [updatePageCover] = userApi.useUpdateUserCoverMutation();

  useEffect(() => {
    setCurrentPageCover(pageCover);

    if (avatar) {
      const getAverageColor = (image: HTMLImageElement) => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = image.width;
        canvas.height = image.height;

        context?.drawImage(image, 0, 0, image.width, image.height);

        const imageData = context?.getImageData(
          0,
          0,
          image.width,
          image.height
        )?.data;
        let totalR = 0;
        let totalG = 0;
        let totalB = 0;
        let pixelCount = 0;

        if (imageData) {
          for (let i = 0; i < imageData.length; i += 4) {
            const r = imageData[i];
            const g = imageData[i + 1];
            const b = imageData[i + 2];

            totalR += r;
            totalG += g;
            totalB += b;
            pixelCount++;
          }

          const averageR = Math.round(totalR / pixelCount);
          const averageG = Math.round(totalG / pixelCount);
          const averageB = Math.round(totalB / pixelCount);

          const averageColorHex = `#${averageR
            .toString(16)
            .padStart(2, "0")}${averageG
            .toString(16)
            .padStart(2, "0")}${averageB.toString(16).padStart(2, "0")}`;

          return averageColorHex;
        }
      };

      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = imageUrl;
      img.onload = () => {
        const div = document.getElementById("gradientCover");
        if (div) {
          div.style.background = `linear-gradient(180deg, ${getAverageColor(
            img
          )}, transparent)`;
        }
      };
    }
  }, [userId]);

  useEffect(() => {
    if (isMyProfile) {
      if (newPageCover) {
        const formData = new FormData();
        formData.append("id", userId);
        formData.append("pageCover", newPageCover);
        updatePageCover(formData).then((res: any) => {
          setCurrentPageCover(res.data.pageCover);
          setNewPageCover(null);
        });
      }
    }
  }, [newPageCover]);

  return (
    <div className="w-full h-[200px] rounded-xl overflow-hidden relative group">
      {isMyProfile && (
        <div className="z-20 group-hover:opacity-100 opacity-0 absolute rounded-md cursor-pointer transition-opacity top-4 left-4 bg-darkBlueGray">
          <label htmlFor="fileLoader" className="cursor-pointer">
            <input
              type="file"
              required
              id="fileLoader"
              onChange={(e) => setNewPageCover(e.target.files![0])}
              className="appearance-none hidden"
            />
            <div className="p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.84 14.44C5.6 14.5 6.58 14.5 8 14.5C9.42 14.5 10.4 14.5 11.16 14.44C11.6531 14.4284 12.139 14.3197 12.59 14.12C13.2488 13.7844 13.7844 13.2488 14.12 12.59C14.27 12.3 14.38 11.9 14.44 11.16L14.47 10.53L13.17 9.23C12.87 8.93 12.67 8.73 12.5 8.59C12.4222 8.51341 12.3306 8.45232 12.23 8.41C12.0805 8.36182 11.9195 8.36182 11.77 8.41C11.6694 8.45232 11.5778 8.51341 11.5 8.59C11.34 8.72 11.14 8.92 10.83 9.23L8.53 11.53C8.38937 11.6705 8.19875 11.7493 8 11.7493C7.80125 11.7493 7.61063 11.6705 7.47 11.53L7.17 11.23C6.87 10.93 6.67 10.73 6.5 10.59C6.42224 10.5134 6.33061 10.4523 6.23 10.41C6.08045 10.3618 5.91955 10.3618 5.77 10.41C5.66939 10.4523 5.57776 10.5134 5.5 10.59C5.34 10.72 5.14 10.92 4.83 11.23L2.56 13.5C2.81 13.74 3.09 13.95 3.41 14.1C3.7 14.26 4.1 14.37 4.84 14.43V14.44ZM14.23 8.17L14.5 8.44V8C14.5 6.58 14.5 5.6 14.44 4.84C14.4284 4.34693 14.3197 3.86098 14.12 3.41C13.7844 2.7512 13.2488 2.2156 12.59 1.88C12.139 1.68033 11.6531 1.57159 11.16 1.56C10.1078 1.50146 9.05371 1.48145 8 1.5C6.58 1.5 5.6 1.5 4.84 1.56C4.1 1.62 3.7 1.73 3.41 1.88C2.7512 2.2156 2.2156 2.7512 1.88 3.41C1.73 3.7 1.62 4.1 1.56 4.84C1.50146 5.89225 1.48145 6.94629 1.5 8C1.5 9.42 1.5 10.4 1.56 11.16C1.6 11.63 1.66 11.96 1.73 12.21L3.77 10.17L3.79 10.15C4.07 9.87 4.31 9.63 4.53 9.45C4.76 9.25 5 9.08 5.3 8.98C5.76 8.83 6.24 8.83 6.7 8.98C7 9.08 7.24 9.25 7.47 9.44C7.63 9.58 7.81 9.74 8 9.94L9.77 8.17L9.79 8.15C10.07 7.87 10.31 7.63 10.53 7.45C10.76 7.25 11 7.08 11.3 6.98C11.76 6.83 12.24 6.83 12.7 6.98C13 7.08 13.24 7.25 13.47 7.44C13.69 7.63 13.93 7.87 14.21 8.14L14.23 8.17ZM0.54 2.73C-5.96046e-08 3.8 0 5.2 0 8C0 10.8 -5.96046e-08 12.2 0.54 13.27C1.01981 14.2134 1.78661 14.9802 2.73 15.46C3.8 16 5.2 16 8 16C10.8 16 12.2 16 13.27 15.46C14.2134 14.9802 14.9802 14.2134 15.46 13.27C16 12.2 16 10.8 16 8C16 5.2 16 3.8 15.45 2.73C14.9728 1.78813 14.2097 1.02151 13.27 0.54C12.2 -5.96046e-08 10.8 0 8 0C5.2 0 3.8 -5.96046e-08 2.73 0.54C1.78661 1.01981 1.01981 1.78661 0.54 2.73ZM5.25 4C4.91848 4 4.60054 4.1317 4.36612 4.36612C4.1317 4.60054 4 4.91848 4 5.25C4 5.58152 4.1317 5.89946 4.36612 6.13388C4.60054 6.3683 4.91848 6.5 5.25 6.5C5.58152 6.5 5.89946 6.3683 6.13388 6.13388C6.3683 5.89946 6.5 5.58152 6.5 5.25C6.5 4.91848 6.3683 4.60054 6.13388 4.36612C5.89946 4.1317 5.58152 4 5.25 4Z"
                  fill="#635BFF"
                />
              </svg>
            </div>
          </label>
        </div>
      )}

      {currentPageCover ? (
        <img
          src={`http://localhost:5003/${currentPageCover}`}
          alt="Wallpaper"
          className="translate-y-[-12%]"
        />
      ) : (
        <div className={`w-full h-full`} id="gradientCover"></div>
      )}
    </div>
  );
};

export default PageCover;
