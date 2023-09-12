import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { picturesApi } from "../store/services/pictureService";
import Container from "../components/Container";
import Card from "../components/Card";
import Footer from "../components/Footer";

// Define a service using a base URL and expected endpoints
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5003";

const Picture = () => {
  const params = useParams();
  const prodId = params.id;

  const { data } = picturesApi.useGetAllPicturesQuery("");

  const picture = data?.find((picture) => picture._id === prodId);
  const fromThisAuthor = data?.filter((el) => el.author === picture?.author);
  return (
    <>
      <div className="">
        <div className="">
          <Container>
            <div className="mt-16  border-b border-inputBorder">
              <div className="flex justify-center">
                <div className="flex flex-col items-center h-max pb-10">
                  <img
                    className="w-[80%] h-[80%] object-cover"
                    // @ts-ignore
                    src={`${baseUrl}/${picture?.image}`}
                    alt="pic"
                  />
                </div>
              </div>
            </div>
          </Container>
        </div>
        <div className="">
          <Container>
            <div className="mt-4">
              <div className="flex ">
                <div className="flex flex-col h-max pb-10 ">
                  <h1 className="text-xl text-title font-bold">
                    {/* @ts-ignore */}
                    {picture?.title}
                  </h1>
                  <div className="flex mt-2">
                    <div className="text-link w-max opacity-80">
                      {/* @ts-ignore */}
                      {picture?.author}
                    </div>
                    <div className="ml-1 text-link w-max opacity-80">
                      {/* @ts-ignore */}- {picture?.year} год
                    </div>
                  </div>

                  <h5 className="mt-2 text-link w-max opacity-80">
                    {/* @ts-ignore */}
                    {picture?.description}
                  </h5>
                </div>
              </div>
            </div>
          </Container>
        </div>
        {/* cards  */}
        <div className="mt-6">
          <Container border>
            <h2 className="mb-4 font-medium text-title text-2xl">
              От этого художника
            </h2>
            <div className="flex flex-wrap">
              {fromThisAuthor?.slice(0, 5)?.map((item, index) => {
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
      </div>
      <Footer />
    </>
  );
};

export default Picture;
