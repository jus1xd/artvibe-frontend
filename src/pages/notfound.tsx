import React from "react";
import Header from "../components/Header";

type TProps = {
  text?: string;
};

const NotFoundPage: React.FC<TProps> = ({ text }) => {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center h-[calc(100vh-200px)] w-screen text-title text-4xl ">
        {text ? text : "Страница не найдена"}
      </div>
    </>
  );
};

export default NotFoundPage;
