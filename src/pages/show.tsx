import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import Header from "../components/Header";

import arrow from "../assets/img/arrow.svg";
import photo from "../assets/img/show/photo.png";
import cardphoto from "../assets/img/cardphoto.png";
import cardphoto1 from "../assets/img/cardphoto1.png";
import Button from "../components/Button";

import Card from "../components/Card";
import { picturesApi } from "../store/services/pictureService";
import Footer from "../components/Footer";
import { Link } from "react-scroll";

const Show = () => {
  const [active, setActive] = useState(false);

  const { data } = picturesApi.useGetAllPicturesQuery("");

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
                  Экспозиции виртуальных миров современности: Наша коллекция
                  выставок
                </h1>
                <p className="mt-7 text-link text-lg w-3/4">
                  Каждая из выставок представляет широкий спектр художественных
                  произведений, включая живопись, скульптуру, фотографию,
                  графику и многое другое
                </p>
                <Link smooth="ease-in" to="show" offset={-30}>
                  <div className="mt-[5%]">
                    <Button text="Смотреть" type="primary" size="md" />
                  </div>
                </Link>
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
        <div className="mb-20" id="show">
          <Container border>
            <h2 className="mb-4 font-medium text-title text-2xl">
              Эпохи и цвета
            </h2>
            <div className="flex justify-between">
              <Card
                size="lg"
                img={cardphoto}
                title="Время"
                link="/show/timeline"
                subtitle="От доисторических артефактов до современных работ"
              />
              <Card
                size="lg"
                img={cardphoto1}
                title="Цвета"
                link="/show/colors"
                subtitle="Ориентируйтесь среди экспонатов по цветам."
              />
            </div>
          </Container>
        </div>
        {/* cards  */}
        <div className="mb-20">
          <Container border>
            <h2 className="mb-4 font-medium text-title text-2xl">Новинки</h2>
            <div className="flex justify-between">
              {data?.slice(-5)?.map((item, index) => {
                return (
                  <Card
                    size="sm"
                    key={item._id}
                    img={item.image}
                    link={`/picture/${item._id}`}
                    title={item.title}
                    subtitle={item.author}
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

export default Show;
