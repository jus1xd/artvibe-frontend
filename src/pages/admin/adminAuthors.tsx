import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import AdminNav from "../../components/AdminNav";
import Container from "../../components/Container";
import CreateCard from "../../components/CreateCard";
import ExistedCard from "../../components/ExistedCard";
import Header from "../../components/Header";
import { authorsApi } from "../../store/services/authorService";

const AdminAuthors = () => {
  const { data } = authorsApi.useGetAllAuthorsQuery("");

  useEffect(() => {
    // authorsApi.endpoints.getAllAuthors.initiate('');
  }, [data]);

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
                {data?.map((author) => (
                  <ExistedCard model="author" data={author} key={author._id} />
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
