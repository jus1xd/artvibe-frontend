import React from "react";
import Header from "../components/Header";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <Header />
      <div className="flex items-center justify-center h-[calc(100vh-200px)] w-screen text-title text-4xl ">
        {"Oops"}, {"что-то пошло не так"}
      </div>
    </>
  );
};

export default ErrorPage;
