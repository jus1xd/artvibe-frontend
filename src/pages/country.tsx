import React from "react";
import Card from "../components/Card";
import Container from "../components/Container";
import { authorsApi } from "../store/services/authorService";
import { picturesApi } from "../store/services/pictureService";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { countriesApi } from "../store/services/countriesService";
import Footer from "../components/Footer";

const Country = () => {
  const params = useParams();
  const prodId = params.id;

  const authors = authorsApi.useGetAllAuthorsQuery("");
  const pictures = picturesApi.useGetAllPicturesQuery("");
  const countries = countriesApi.useGetAllCountriesQuery("");

  const currentCountry = countries.data?.find(
    (country) => country._id === prodId
  );

  // Авторы страны
  const authorsOfCountry = authors.data?.filter(
    (el) =>
      el.country === countries.data?.find((subel) => subel._id === prodId)?.name
  );

  const picturesOfAuthors = authorsOfCountry?.map((author) => {
    return pictures.data?.filter(
      (picture: any) => picture.author === author.fullname
    );
  });

  return (
    <div>
      <Header />
      {/* cards  */}
      <div className="mt-20">
        <Container border>
          <h2 className="mb-4 font-medium text-title text-2xl">
            Экспонаты страны -
            <span className="text-dark opacity-80">
              {" " + currentCountry?.name}
            </span>
          </h2>
          <div className="flex flex-wrap">
            {
              // @ts-ignore
              picturesOfAuthors?.length > 0 ? (
                // @ts-ignore
                picturesOfAuthors?.map((author) => {
                  return author?.map((item, index) => {
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
                  });
                })
              ) : (
                <div className="text-3xl text-dark py-32 text-center w-full">
                  Нет экспонатов
                </div>
              )
            }
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default Country;
