import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Container";
import Header from "../components/Header";

import avatar1 from "../assets/img/start/avatar1.png";
import avatar2 from "../assets/img/start/avatar2.png";
import tripla from "../assets/img/start/tripla.svg";

import tool1 from "../assets/img/start/Group.svg";
import tool2 from "../assets/img/start/Group-1.svg";
import tool3 from "../assets/img/start/Group-2.svg";
import tool4 from "../assets/img/start/Group-3.svg";
import tool5 from "../assets/img/start/Group-4.svg";

type TProps = {
  setTheme: (theme: string) => void;
};

const Start: React.FC<TProps> = ({ setTheme }) => {
  useEffect(() => {
    setTheme("light");
  }, []);

  const tags = [
    "Threads",
    "Direct Messages",
    "Profile customization",
    "Friends",
    "Communities",
    "Calls",
    "Music playlists",
    "Videos",
  ];

  return (
    <>
      <div className="mt-[8%] messenger text-white">
        <Container>
          <div className="flex justify-between">
            {/* text  */}
            <div className="w-full sm:w-[50%]">
              <div className="relative text-xl text-accent flex items-center mb-4">
                <span className="font-bold">ARTVIBE</span>
                <svg
                  className="stroke-accent ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="9"
                  height="8"
                  viewBox="0 0 9 8"
                  fill="none"
                >
                  <path
                    d="M1 3.5C0.723858 3.5 0.5 3.72386 0.5 4C0.5 4.27614 0.723858 4.5 1 4.5V3.5ZM8.35355 4.35355C8.54882 4.15829 8.54882 3.84171 8.35355 3.64645L5.17157 0.464466C4.97631 0.269204 4.65973 0.269204 4.46447 0.464466C4.2692 0.659728 4.2692 0.976311 4.46447 1.17157L7.29289 4L4.46447 6.82843C4.2692 7.02369 4.2692 7.34027 4.46447 7.53553C4.65973 7.7308 4.97631 7.7308 5.17157 7.53553L8.35355 4.35355ZM1 4.5H8V3.5H1V4.5Z"
                    fill="#635BFF"
                  />
                </svg>
                <img
                  src={tripla}
                  className="absolute rotate-90 -z-10 -bottom-24 -left-[23%]"
                  alt=""
                />
                <div className="absolute -top-5 -left-[30%] -z-10 w-[380px] h-[380px] bg-accent rounded-full blur-[75px] opacity-20"></div>
              </div>
              <div className="relative">
                <h1 className="start-title w-[90%] pb-1 bg-gradient-to-l from-[#635BFF] to-[#CAC8FF] text-[64px] sm:text-[64px] leading-[1.02] font-bold">
                  Here your next gen social media.
                </h1>
                <div className="absolute -top-5 -right-5 -z-10 w-[220px] h-[220px] bg-accent rounded-full blur-[75px] opacity-20"></div>
              </div>
              <p className="my-6 opacity-80 text-lg">
                Whether you're a painter, musician, writer, or any other kind of
                creative soul, you'll find a home here. Our platform is designed
                to foster genuine connections and support your artistic journey.
              </p>
              <div className="flex my-2 flex-wrap select-none">
                <div className="start-tag mr-2">
                  <span className="font-medium px-3 py-1 text-sm rounded-full bg-gradient-to-r from-[#D9565640] via-[#AC55BA40] to-[#0778E040]">
                    AI Assisted
                  </span>
                </div>
                {tags.map((tag, index) => (
                  <div key={index} className="mr-2 mb-2">
                    <span className="px-3 py-1 font-medium text-sm rounded-full text-accent bg-accentOpacity">
                      {tag}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-16 flex">
                <NavLink className="relative z-20" to={"/login"}>
                  <div className="group mr-5 w-max px-5 py-1 flex items-center rounded-full bg-gradient-to-l from-[#635BFF] to-[#b9b6ff]">
                    <span className="font-medium mr-1">Getting started</span>
                    <svg
                      className="group-hover:ml-1 group-hover:rotate-45 transition-all"
                      xmlns="http://www.w3.org/2000/svg"
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      fill="none"
                    >
                      <path
                        d="M6.6501 7.36265C6.6501 7.75215 6.9731 8.07515 7.3626 8.07515H9.9181L6.8591 11.1341C6.78909 11.1994 6.73295 11.278 6.694 11.3654C6.65506 11.4528 6.63412 11.5472 6.63244 11.6429C6.63075 11.7385 6.64835 11.8335 6.68418 11.9223C6.72002 12.011 6.77335 12.0916 6.84101 12.1592C6.90867 12.2269 6.98926 12.2802 7.07798 12.3161C7.1667 12.3519 7.26173 12.3695 7.35739 12.3678C7.45306 12.3661 7.54741 12.3452 7.63481 12.3062C7.72221 12.2673 7.80087 12.2111 7.8661 12.1411L10.9251 9.08215V11.6376C10.9251 11.8266 11.0002 12.0078 11.1338 12.1415C11.2674 12.2751 11.4486 12.3501 11.6376 12.3501C11.8266 12.3501 12.0078 12.2751 12.1414 12.1415C12.275 12.0078 12.3501 11.8266 12.3501 11.6376V7.36265C12.3501 7.17368 12.275 6.99245 12.1414 6.85883C12.0078 6.72521 11.8266 6.65015 11.6376 6.65015H7.3626C7.17363 6.65015 6.9924 6.72521 6.85878 6.85883C6.72516 6.99245 6.6501 7.17368 6.6501 7.36265Z"
                        fill="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.50005 17.575C10.5605 17.575 11.6105 17.3662 12.5902 16.9604C13.5699 16.5546 14.4601 15.9598 15.2099 15.2099C15.9598 14.4601 16.5546 13.5699 16.9604 12.5902C17.3662 11.6105 17.575 10.5605 17.575 9.50005C17.575 8.43962 17.3662 7.38958 16.9604 6.40988C16.5546 5.43018 15.9598 4.53999 15.2099 3.79016C14.4601 3.04033 13.5699 2.44553 12.5902 2.03972C11.6105 1.63391 10.5605 1.42505 9.50005 1.42505C7.35843 1.42505 5.30452 2.27581 3.79016 3.79016C2.27581 5.30452 1.42505 7.35843 1.42505 9.50005C1.42505 11.6417 2.27581 13.6956 3.79016 15.2099C5.30452 16.7243 7.35843 17.575 9.50005 17.575ZM16.15 9.50005C16.15 10.3733 15.978 11.2381 15.6438 12.0449C15.3097 12.8517 14.8198 13.5848 14.2023 14.2023C13.5848 14.8198 12.8517 15.3097 12.0449 15.6438C11.2381 15.978 10.3733 16.15 9.50005 16.15C8.62676 16.15 7.76202 15.978 6.9552 15.6438C6.14839 15.3097 5.4153 14.8198 4.79779 14.2023C4.18028 13.5848 3.69044 12.8517 3.35625 12.0449C3.02206 11.2381 2.85005 10.3733 2.85005 9.50005C2.85005 7.73636 3.55067 6.04491 4.79779 4.79779C6.04491 3.55067 7.73636 2.85005 9.50005 2.85005C11.2637 2.85005 12.9552 3.55067 14.2023 4.79779C15.4494 6.04491 16.15 7.73636 16.15 9.50005Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </NavLink>
                <NavLink className="relative z-20" to={"/show"}>
                  <div className="w-max px-5 py-[2px] flex items-center rounded-full border-2 border-[#ffffff00] hover:border-white transition-colors">
                    <span className="font-medium">Look at museum</span>
                  </div>
                </NavLink>
              </div>
            </div>
            {/* pictures  */}
            <div className="relative hidden sm:flex flex-col w-[40%]">
              <div className="message-item relative w-full h-max flex justify-end">
                <div className="w-2/3">
                  <div className="flex items-center justify-end mb-2 text-sm">
                    <span className="mr-2">Mark</span>
                    <img className="select-none" src={avatar1} alt="" />
                  </div>
                  <div className="bg-accent relative p-3 rounded-2xl rounded-tr-none">
                    <div className="font-medium">
                      What’s up! Let me take a look what happened at party
                    </div>
                    <div className="text-[12px] flex justify-end">6:30 PM</div>
                    <svg
                      className="absolute -bottom-4 -right-3 -z-10 scale-125"
                      xmlns="http://www.w3.org/2000/svg"
                      width="84"
                      height="109"
                      viewBox="0 0 84 109"
                      fill="none"
                    >
                      <path
                        d="M67.8446 0.542781C91.8594 5.31329 62.323 50.878 77.4584 70.1234C93.3681 90.3534 73.54 80.1463 52.3873 94.8068C43.8654 100.713 37.13 109.175 29.8003 107.917C24.7603 107.052 20.9868 102.791 16.9492 99.6534C-13.9586 75.6317 5.06787 52.1456 23.3505 33.9183C36.0496 21.2576 51.6885 -2.66663 67.8446 0.542781Z"
                        fill="#15171C"
                      />
                    </svg>
                  </div>
                </div>
                <img
                  src={tripla}
                  className="absolute -z-10 -bottom-16 left-16"
                  alt=""
                />
              </div>
              {/* second message  */}
              <div className="message-item mt-10 relative w-full h-max flex">
                <div className="w-2/3">
                  <div className="flex items-center mb-2 text-sm">
                    <img className="select-none" src={avatar2} alt="" />
                    <span className="ml-2">Alex</span>
                  </div>
                  <div className="bg-darkBlueGray relative p-3 rounded-2xl rounded-tl-none">
                    <div className="font-medium">
                      Hi! A party was awesome. Sent a couple of pictures from
                      it.
                    </div>
                    <div className="text-[12px] flex justify-end">8:00 AM</div>
                    <svg
                      className="absolute -bottom-5 -left-4 -z-10 scale-125"
                      xmlns="http://www.w3.org/2000/svg"
                      width="115"
                      height="84"
                      viewBox="0 0 115 84"
                      fill="none"
                    >
                      <path
                        d="M114.015 48.1097C115.659 72.5384 63.977 55.8797 49.3344 75.5027C33.9428 96.1294 38.6371 74.328 18.9763 57.7202C11.0555 51.0294 1.13227 46.7286 0.439243 39.324C-0.037281 34.2326 3.09394 29.4802 5.07291 24.765C20.2219 -11.3298 47.8507 0.927899 70.2085 13.8362C85.7381 22.8022 112.908 31.675 114.015 48.1097Z"
                        fill="#635BFF"
                      />
                    </svg>
                  </div>
                </div>
                <img
                  src={tripla}
                  className="absolute -z-10 -bottom-16 right-20"
                  alt=""
                />
              </div>
              {/* features */}
              <div className="relative select-none -z-30 w-max mt-32 mx-auto pb-3 pt-4 px-7 bg-darkBlueGray rounded-full rounded-tl-none">
                <div className="z-10 absolute text-[12px] font-bold top-[-14px] left-[-10px] border-[3px] bg-darkBackground rounded-xl border-darkBackground text-accent py-0 px-3">
                  Advanced tools
                </div>
                <div className="flex items-center">
                  <div className="mr-8">
                    <img src={tool1} alt="" />
                  </div>
                  <div className="mr-8">
                    <img src={tool2} alt="" />
                  </div>
                  <div className="mr-8">
                    <img src={tool3} alt="" />
                  </div>
                  <div className="mr-8">
                    <img src={tool4} alt="" />
                  </div>
                  <div className="">
                    <img src={tool5} alt="" />
                  </div>
                </div>
              </div>
              <div className="absolute -top-5 left-5 -z-20 w-[400px] h-[400px] bg-accent rounded-full blur-3xl opacity-20"></div>
            </div>
          </div>
        </Container>
        <svg
          className="absolute top-1/2 left-0 -z-50"
          xmlns="http://www.w3.org/2000/svg"
          width="74"
          height="241"
          viewBox="0 0 74 241"
          fill="none"
        >
          <path
            d="M6.93416 0.852065C56.672 2.47138 15.6166 91.9448 50.2618 127.668C51.8122 129.267 53.4854 130.825 55.2552 132.348C94.9008 166.474 61.4116 159.848 26.2484 198.576C8.92483 217.656 -0.51359 244.394 -21.0887 239.898C-27.5546 238.486 -33.5387 235.202 -39.7314 232.866C-122.913 201.499 -96.4715 141.541 -68.5901 93.2486C-49.1027 59.4955 -29.8241 -0.344663 6.93416 0.852065Z"
            fill="#635BFF"
          />
        </svg>
        <svg
          className="absolute top-1/4 right-0 -z-50"
          xmlns="http://www.w3.org/2000/svg"
          width="93"
          height="244"
          viewBox="0 0 93 244"
          fill="none"
        >
          <path
            d="M67.0557 243.867C17.4316 240.136 59.2925 152.656 25.497 116.127C23.3183 113.772 20.8711 111.505 18.2338 109.307C-21.9492 75.8163 11.9991 82.2469 47.8355 44.1407C66.1695 24.6455 75.7253 -3.80504 97.1665 1.03735C103.622 2.49537 109.597 5.7589 115.792 8.08856C200.52 39.9516 173.631 100.933 145.278 150.043C125.215 184.792 105.37 246.748 67.0557 243.867Z"
            fill="#635BFF"
          />
        </svg>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Start;
