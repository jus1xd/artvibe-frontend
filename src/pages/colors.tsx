import React, { useState } from "react";
import Card from "../components/Card";
import Container from "../components/Container";
import Header from "../components/Header";
import { picturesApi } from "../store/services/pictureService";

const Colors = () => {
  const [currentColor, setCurrentColor] = useState<string>("Красный");

  const { data } = picturesApi.useGetAllPicturesQuery("");

  // const picture = data?.find((picture) => picture._id === prodId);
  // const fromThisAuthor = data?.filter((el) => el.author === picture?.author);

  const colors = [
    { Красный: "#C53229" },
    { Зеленый: "#29C54B" },
    { Синий: "#294BC5" },
    { Голубой: "#5BB0FF" },
    { Желтый: "#C1C529" },
    { Оранжевый: "#C56A29" },
    { Коричневый: "#3E3229" },
    { Серый: "#6D6D6D" },
    { Фиолетовый: "#635BFF" },
    { Розовый: "#E85BFF" },
  ];

  return (
    <>
      <Header />
      {/* colors palette */}
      <div className="mt-20">
        <Container border>
          <h2 className="mb-4 font-medium text-title text-2xl">
            Цветовая палитра
          </h2>
          <div className="flex justify-between">
            {colors?.map((color, index) => {
              return (
                <div
                  onClick={() => setCurrentColor(Object.keys(color)[0])}
                  key={index}
                  // @ts-ignore
                  className={`w-20 h-20 rounded-md`}
                  // @ts-ignore
                  style={{ backgroundColor: Object.values(color) }}
                ></div>
              );
            })}
          </div>
        </Container>
      </div>
      {/* cards  */}
      <div className="mt-20">
        <Container border>
          <h2 className="mb-4 font-medium text-title text-2xl">
            Экспонаты цвета{" "}
            <span className="text-dark opacity-80">{" - " + currentColor}</span>
          </h2>
          <div className="flex justify-start flex-wrap">
            {data
              ?.filter((el) => el.color === currentColor)
              .map((item, index) => {
                return (
                  <Card
                    useMargin
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
    </>
  );
};

export default Colors;
