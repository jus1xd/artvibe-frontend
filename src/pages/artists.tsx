import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Container from "../components/Container";
import Header from "../components/Header";

import arrow from "../assets/img/arrow.svg";
import photo from "../assets/img/artists/photo.png";
import cardphoto from "../assets/img/artists/cardphoto.png";
import Button from "../components/Button";

const Artists = () => {
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
              <div className="flex flex-col w-[55%] py-12">
                <div className="text-accent mb-5 flex select-none">
                  <span className="mr-1 flex items-center">В этом разделе</span>
                  <img className="mt-[2px]" src={arrow} alt="" />
                </div>
                <h1 className="text-5xl text-title font-bold">
                  Искусство в разных воплощениях: знакомьтесь с нашими
                  художниками
                </h1>
                <p className="mt-7 text-link text-lg w-3/4">
                  Здесь вы можете познакомиться с нашими талантливыми
                  художниками со всего мира, и узнать больше о творческих
                  воплощениях каждого из них
                </p>
                <div className="mt-[5%]">
                  <Button text="Смотреть" type="primary" size="md" />
                </div>
              </div>
              {/* image  */}
              <div className="w-[45%] mr-[-5%] mb-[5%]">
                <img
                  className="w-full h-full object-cover"
                  src={photo}
                  alt="pic"
                />
              </div>
            </div>
          </Container>
        </div>
        {/* cards  */}
        <div className="mb-20">
          <Container border>
            <h2 className="mb-4 font-medium text-title text-2xl">Художники</h2>
            <div className="flex justify-between flex-wrap">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item) => {
                return (
                  <Card
                    size="sm"
                    img={cardphoto}
                    title="Эдуард Мане"
                    subtitle="477 экспонатов"
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

export default Artists;
