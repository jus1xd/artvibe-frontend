import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { authorsApi } from "../store/services/authorService";
import Container from "../components/Container";
import Card from "../components/Card";
import { picturesApi } from "../store/services/pictureService";
import Header from "../components/Header";
import Footer from "../components/Footer";

type TProps = {
  setTheme: (theme: string) => void;
};

const Artist: React.FC<TProps> = ({ setTheme }) => {
  const params = useParams();
  const prodId = params.id;
  const { data } = authorsApi.useGetAllAuthorsQuery("");
  const pictures = picturesApi.useGetAllPicturesQuery("");

  const currentAuthor = data?.find((author) => author._id === prodId);

  const picturesOfAuthor = pictures.data?.filter(
    (el) =>
      el.author === data?.find((picture) => picture._id === prodId)?.fullname
  );

  useEffect(() => {
    setTheme("dark");
  }, []);
  return (
    <div>
      {/* cards  */}
      <div className="mt-20">
        <Container border>
          <h2 className="mb-4 font-medium text-title text-2xl">
            Экспонаты автора{" "}
            <span className="text-dark opacity-80">
              {currentAuthor?.fullname}
            </span>
          </h2>
          <div className="flex flex-wrap">
            {
              // @ts-ignore
              picturesOfAuthor?.length > 0 ? (
                // @ts-ignore
                picturesOfAuthor?.map((item, index) => {
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
                })
              ) : (
                <div className="text-3xl text-dark py-10 text-center w-full">
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

export default Artist;
