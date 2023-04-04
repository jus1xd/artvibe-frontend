import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Container from "../components/Container";
import Header from "../components/Header";

import arrow from "../assets/img/arrow.svg";
import photo from "../assets/img/contacts/photo.png";

import pic1 from "../assets/img/about/pic1.svg";
import pic2 from "../assets/img/about/pic2.svg";
import pic3 from "../assets/img/about/pic3.svg";

import { picturesApi } from "../store/services/pictureService";
import Footer from "../components/Footer";
import { Link } from "react-scroll";

const About = () => {
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
              <div className="flex flex-col w-[50%] py-12">
                <div className="text-accent mb-5 flex select-none">
                  <span className="mr-1 flex items-center">В этом разделе</span>
                  <img className="mt-[2px]" src={arrow} alt="" />
                </div>
                <h1 className="text-5xl text-title w-[80%] font-bold">
                  О нас: погружение в мир искусства и культуры
                </h1>
                <p className="mt-7 text-link text-lg ">
                  В нашем музее вы найдете большую коллекцию произведений
                  искусства, которые охватывают разные эпохи и культуры. Мы
                  собрали для вас лучшие работы известных мастеров, чтобы вы
                  смогли насладиться ими вместе с нами
                </p>
                <Link smooth="ease-in" to="targets" offset={-70}>
                  <div className="mt-[5%]">
                    <Button text="Наши цели" type="primary" size="md" />
                  </div>
                </Link>
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
        {/* benefits  */}
        <div className="mb-20" id="targets">
          <Container>
            <h2 className="mb-10 font-medium text-title text-2xl">
              Цели нашего музея
            </h2>
          </Container>
          <Container border>
            <div className="mb-16">
              <div className="flex justify-between items-end mb-8">
                <div className="relative">
                  <img src={pic1} alt="pic1" />
                  <span className="absolute top-[calc(50%-40px)] left-[calc(50%-15px)] font-bold text-white benefit_number text-6xl">
                    1.
                  </span>
                </div>
                <h1 className="mb-5 benefit_title font-bold bg-gradient-to-r from-[#D95656] via-[#AC55BA] to-[#0778E0] text-6xl fo">
                  Образование
                </h1>
              </div>
              <div className="text-link w-[90%] text-lg">
                Одна из главных целей онлайн-музея - донесение знаний о
                искусстве и культуре до широкой аудитории. Музей должен
                предоставлять информацию о картинах, скульптурах, архитектуре,
                музыке и других формах искусства, а также контекст их создания и
                историческое значение. Цель заключается в том, чтобы помочь
                людям понять значение искусства в их жизни и в контексте
                общества в целом.
              </div>
            </div>
          </Container>
          <Container border>
            <div className="mb-16">
              <div className="flex justify-between items-end mb-8">
                <div className="relative">
                  <img src={pic2} alt="pic1" />
                  <span className="absolute top-[calc(50%-40px)] left-[calc(50%-15px)] font-bold text-white benefit_number text-6xl">
                    2.
                  </span>
                </div>
                <h1 className="mb-5 benefit_title font-bold bg-gradient-to-r from-[#1C2892] via-[#37A3D1] to-[#0BE007] text-6xl fo">
                  Вдохновение
                </h1>
              </div>
              <div className="text-link w-[90%] text-lg">
                Вторая цель онлайн-музея - вдохновить своих посетителей на
                творчество и самовыражение. Музей должен стать источником
                вдохновения для людей, показав им красоту и многогранность
                искусства и культуры. В своих экспозициях музей может
                использовать различные приемы, чтобы вызвать у посетителей
                эмоции, включая использование цвета, формы, света и звука
              </div>
            </div>
          </Container>
          <Container border>
            <div className="mb-16">
              <div className="flex justify-between items-end mb-8">
                <div className="relative">
                  <img src={pic3} alt="pic3" />
                  <span className="absolute top-[calc(50%-40px)] left-[calc(50%-15px)] font-bold text-white benefit_number text-6xl">
                    3.
                  </span>
                </div>
                <h1 className="mb-4 benefit_title font-bold bg-gradient-to-r from-[#E1AC25] via-[#C1D932] to-[#E00707] text-6xl pb-1">
                  Доступность
                </h1>
              </div>
              <div className="text-link w-[90%] text-lg">
                Третья цель онлайн-музея - сделать искусство и культуру
                доступными для всех. Онлайн-музей должен предоставлять
                возможность посещения экспозиций без ограничений на время и
                место, и быть доступным для широкой аудитории по всему миру. В
                целом, онлайн-музей должен стать инструментом, который улучшает
                культурную грамотность и образование людей, а также помогает им
                обретать новые взгляды на искусство и мир вокруг нас.
              </div>
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

export default About;
