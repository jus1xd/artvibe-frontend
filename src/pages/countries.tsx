import React, { useEffect, useState } from "react";

import Button from "../components/Button";
import Card from "../components/Card";
import Container from "../components/Container";
import Header from "../components/Header";
import arrow from "../assets/img/arrow.svg";
import { countriesApi } from "../store/services/countriesService";
import Planet from "../components/planet";
import Footer from "../components/Footer";
import { Link } from "react-scroll";

const Countries = () => {
  const [active, setActive] = useState(false);

  const countries = countriesApi.useGetAllCountriesQuery("");

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
                <Link smooth="ease-in" to="countries" offset={-30}>
                  <div className="mt-[5%]">
                    <Button text="Смотреть" type="primary" size="md" />
                  </div>
                </Link>
              </div>
              {/* 3d earth planet  */}
              <div className="3d_planet_container w-[45%] mr-[-5%] mb-[5%]">
                <div className="3d_planet">
                  <Planet />
                </div>
              </div>
              {/* <div className="w-[45%] mr-[-5%] mb-[5%]">
                <img
                  className="w-full h-full object-cover"
                  src={photo}
                  alt="pic"
                />
              </div> */}
            </div>
          </Container>
        </div>
        {/* cards  */}
        <div className="mb-20">
          <Container border>
            <h2 className="mb-4 font-medium text-title text-2xl" id="countries">Страны</h2>
            <div className="flex flex-wrap">
              {countries?.data?.map((item) => {
                return (
                  <Card
                    useMargin
                    size="xs"
                    img={item.image}
                    title={item.name}
                    link={`/country/${item._id}`}
                    subtitle=""
                  />
                );
              })}
            </div>
          </Container>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Countries;
