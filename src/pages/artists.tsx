import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Container from "../components/Container";
import Header from "../components/Header";

import arrow from "../assets/img/arrow.svg";
import photo from "../assets/img/artists/photo.png";
import Button from "../components/Button";
import { authorsApi } from "../store/services/authorService";
import { picturesApi } from "../store/services/pictureService";
import Footer from "../components/Footer";
import { Link } from "react-scroll";

const Artists = () => {
  const [active, setActive] = useState(false);

  const { data } = authorsApi.useGetAllAuthorsQuery("");
  const dataPictures = picturesApi.useGetAllPicturesQuery("");

  useEffect(() => {
    setTimeout(async () => {
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
                <Link smooth="ease-in" to="artists" offset={-30}>
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
        <div className="mb-20">
          <Container border>
            <h2 className="mb-4 font-medium text-title text-2xl" id="artists">Художники</h2>
            <div className="flex justify-between flex-wrap">
              {data?.map((item) => {
                return (
                  <Card
                    size="sm"
                    // @ts-ignore
                    img={item.image}
                    title={item.fullname}
                    link={`/artist/${item._id}`}
                    // @ts-ignore
                    subtitle={`${
                      dataPictures?.data?.filter(
                        (el) => el.author === item.fullname
                      ).length
                    } экспонатов`}
                    key={item.fullname}
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

export default Artists;
