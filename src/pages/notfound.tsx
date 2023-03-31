import React from "react";
import Header from "../components/Header";

const NotFoundPage = () => {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center h-[calc(100vh-200px)] w-screen text-title text-4xl ">Страница не найдена</div>
    </>
  );
};

export default NotFoundPage;
