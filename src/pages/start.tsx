import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Container";
import Header from "../components/Header";

import pic1 from "../assets/img/index/pic1.png";
import pic2 from "../assets/img/index/pic2.png";
import pic3 from "../assets/img/index/pic3.png";
import pic4 from "../assets/img/index/pic4.png";

const Start = () => {
  return (
    <>
      <Header theme="light" />
      <div className="absolute w-screen h-screen top-[-40px] left-0 z-[-1]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          viewBox="0 0 1440 393"
          fill="none"
        >
          <path d="M0 0H1440V97L0 393V0Z" fill="url(#paint0_linear_16_24)" />
          <defs>
            <linearGradient
              id="paint0_linear_16_24"
              x1="27.0001"
              y1="313.374"
              x2="1425.27"
              y2="40.7692"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#B457D5" />
              <stop offset="0.380208" stopColor="#4CBBD3" />
              <stop offset="0.677083" stopColor="#FC3E3E" />
              <stop offset="1" stopColor="#FFBE17" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute w-screen h-screen top-[-40px] left-0 z-[1]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          viewBox="0 0 1440 393"
          fill="none"
        >
          <path
            opacity="0.3"
            d="M0 0H1440V97L0 393V0Z"
            fill="url(#paint0_linear_16_6)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_16_6"
              x1="27.0001"
              y1="313.374"
              x2="1425.27"
              y2="40.7692"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#B457D5" />
              <stop offset="0.380208" stopColor="#4CBBD3" />
              <stop offset="0.677083" stopColor="#FC3E3E" />
              <stop offset="1" stopColor="#FFBE17" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="mt-[8%]">
        <Container>
          <div className="flex">
            {/* text  */}
            <div className="w-[60%]">
              <h1 className="text-title w-full text-6xl font-bold">
                Artvibe - выставки для любителей искусства всех времен
              </h1>
              <p className="mt-10 text-link text-lg w-2/3">
                Каждая из выставок представляет широкий спектр художественных
                произведений, включая живопись, скульптуру, фотографию, графику
                и многое другое
              </p>
              <div className="mt-[7%]">
                <NavLink className="relative z-20" to={"/show"}>
                  <Button text="Смотреть" type="primary" size="md" />
                </NavLink>
              </div>
            </div>
            {/* pictures  */}
            <div className="flex flex-wrap w-[40%] mr-[-100px]">
              <div className="flex items-end mb-4">
                <div className="w-[55%] h-max mr-3">
                  <img className="" src={pic1} alt="pic1" />
                </div>
                <div className="w-[45%] h-auto">
                  <img className="" src={pic2} alt="pic2" />
                </div>
              </div>

              <div className="flex items-start mb-4">
                <div className="w-[45%] h-max mr-3">
                  <img className="" src={pic3} alt="pic3" />
                </div>
                <div className="w-[55%] h-auto">
                  <img className="" src={pic4} alt="pic4" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Start;
