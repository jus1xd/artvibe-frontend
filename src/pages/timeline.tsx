import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Container from "../components/Container";
import Header from "../components/Header";
import { picturesApi } from "../store/services/pictureService";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";

const Timeline = () => {
  const [currentFilter, setCurrentFilter] = useState<boolean>(false);

  const { data } = picturesApi.useGetAllPicturesQuery("");

  function reverseEz(arr: any) {
    let newData = [];
    for (let i = arr.length - 1; i >= 0; i--) {
      newData.push(arr[i]);
    }
    return newData;
  }

  return (
    <>
      <Header />
      {/* colors palette */}
      <div className="mt-20">
        <Container border>
          <div className="flex justify-between">
            <h2 className="mb-4 font-medium text-title text-2xl">
              Сортировка по времени
            </h2>
            <h2
              onClick={() => setCurrentFilter(!currentFilter)}
              className="mb-4 font-medium text-[#22222290] text-2xl cursor-pointer"
            >
              {currentFilter ? "сначала современные" : "сначала древние"}
            </h2>
          </div>
          <div className="flex justify-between flex-wrap">
            {
              // @ts-ignore
              data?.length > 0
                ? currentFilter
                  ? reverseEz(data)?.map((item, index) => {
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
                    })
                  : data?.map((item, index) => {
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
                    })
                : null
            }
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Timeline;
