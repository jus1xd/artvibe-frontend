import React, { useEffect, useState } from "react";

import Container from "../components/Container";
import Header from "../components/Header";

import arrow from "../assets/img/arrow.svg";
import photo from "../assets/img/contacts/photo.png";
import cardphotosm from "../assets/img/popular.png";
import Button from "../components/Button";
import Card from "../components/Card";
import { NavLink } from "react-router-dom";

const Contacts = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setActive(true);
    }, 300);
  }, []);

  return (
    <>
      <Header />
      <div
        className={`${
          active ? "scale-100 opacity-1" : "scale-110 opacity-0"
        } "transition transform-gpu duration-700 mt-10 "`}
      >
        {/* intro  */}
        <div className="mb-20">
          <Container lBorder>
            {/* text  */}
            <div className="flex justify-between items-center h-max">
              <div className="flex flex-col w-[43%] py-12">
                <div className="text-accent mb-5 flex select-none">
                  <span className="mr-1 flex items-center">В этом разделе</span>
                  <img className="mt-[2px]" src={arrow} alt="" />
                </div>
                <h1 className="text-5xl text-title w-4/5 font-bold">
                  Свяжитесь с нашей командой разработчиков
                </h1>
                <p className="mt-7 text-link text-lg w-full">
                  Кроме того, если у вас есть какие-либо вопросы или комментарии
                  вы можете написать нам по адресу электронной почты, указанному
                  на странице контактов, или написать в личные сообщения в
                  группу в Вконтакте.
                </p>
                <div className="mt-[5%]">
                  <NavLink to={"https://vk.com/im?media=&sel=-219450777"} target="_blank"> 
                    <Button
                      text="Написать в ВКонтакте"
                      type="primary"
                      size="md"
                    />
                  </NavLink>
                </div>
              </div>
              {/* image  */}
              <div className="relative w-[57%] mr-[-15%] mb-[-10%]">
                <img
                  className="relative z-20 w-full h-full object-cover"
                  src={photo}
                  alt="pic"
                />
                <div className="absolute py-1 pl-3 pr-12 rounded-3xl bg-dark text-white text-lg left-[-5%] z-10 top-24">
                  contact@artvibe.ru
                </div>
              </div>
            </div>
          </Container>
        </div>
        {/* cards  */}
        <div className="mb-20">
          <Container border>
            <h2 className="mb-4 font-medium text-title text-2xl">Популярное</h2>
            <div className="flex justify-between">
              {[1, 2, 3, 4, 5].map((item, index) => {
                return (
                  <Card
                    size="sm"
                    img={cardphotosm}
                    title="Чинкве-Терре"
                    subtitle="1247 экспонатов"
                  />
                );
              })}
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Contacts;
