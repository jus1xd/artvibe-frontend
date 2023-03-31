import React, { useEffect, useState } from "react";

import Button from "../components/Button";
import Card from "../components/Card";
import Container from "../components/Container";
import Header from "../components/Header";

import arrow from "../assets/img/arrow.svg";
import photo from "../assets/img/countries/photo.png";
import cardphotosm from "../assets/img/countries/cardphoto.png";
import { countriesApi } from "../store/services/countriesService";

const Countries = () => {
  const [active, setActive] = useState(false);

  const { data } = countriesApi.useGetAllCountriesQuery("");

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
              <div className="flex flex-col w-[60%] py-12">
                <div className="text-accent mb-5 flex select-none">
                  <span className="mr-1 flex items-center">В этом разделе</span>
                  <img className="mt-[2px]" src={arrow} alt="" />
                </div>
                <h1 className="text-5xl text-title font-bold">
                  Мы вам покажем, в каком уголке света была написана ваша
                  любимая картина
                </h1>
                <p className="mt-7 text-link text-lg w-3/4">
                  Каждая из выставок представляет широкий спектр художественных
                  произведений, включая живопись, скульптуру, фотографию,
                  графику и многое другое
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
            <h2 className="mb-4 font-medium text-title text-2xl">Страны</h2>
            <div className="flex justify-between">
              {data?.map((item) => {
                return (
                  <Card
                    size="xs"
                    img={item.image}
                    title={item.name}
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

export default Countries;
