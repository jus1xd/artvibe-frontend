import React from "react";
import AdminNav from "../../components/AdminNav";
import Container from "../../components/Container";
import CreateCard from "../../components/CreateCard";
import ExistedCard from "../../components/ExistedCard";
import Header from "../../components/Header";
import { authorsApi } from "../../store/services/authorService";

const AdminAuthors = () => {
  const { data, isLoading } = authorsApi.useGetAllAuthorsQuery("");

  // spawn a lot skeletons
  const elements = [];
  for (let i = 1; i <= 20; i++) {
    elements.push(
      <ExistedCard model="author" isLoading={isLoading} data={0} key={i} />
    );
  }
  // **

  function reverseEz(arr: any) {
    let newData = [];
    for (let i = arr.length - 1; i >= 0; i--) {
      newData.push(arr[i]);
    }
    return newData;
  }

  return (
    <>
      <div className="">
        <Header />
        <div className="mt-20">
          <Container>
            <h1 className="mb-7 text-title text-2xl fond-medium">
              Система управления -{" "}
              <span className="text-border">Художники</span>
            </h1>
            <div className="flex">
              <div className="flex w-1/5 mr-3">
                <AdminNav />
              </div>
              <div className="w-[80%] flex flex-wrap justify-start">
                <CreateCard model="author" />
                {/* {
                  // @ts-ignore
                  data?.length > 0
                    ? reverseEz(data)?.map((author) => (
                        <ExistedCard
                          model="author"
                          data={author}
                          key={author._id}
                        />
                      ))
                    : null
                } */}
                {isLoading
                  ? elements
                  : reverseEz(data)?.map((author) => (
                      <ExistedCard
                        model="author"
                        isLoading={isLoading}
                        data={author}
                        key={author._id}
                      />
                    ))}
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default AdminAuthors;
