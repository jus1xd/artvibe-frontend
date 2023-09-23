import React, { useEffect } from "react";
import Header from "../components/Header";
import { useRouteError } from "react-router-dom";

type TProps = {
  setTheme: (theme: string) => void;
};

const ErrorPage: React.FC<TProps> = ({ setTheme }) => {
  const error = useRouteError();
  console.error(error);
  
  useEffect(() => {
    setTheme("dark");
  }, []);

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] w-screen">
        <div className="text-title text-4xl mb-3">
          {"Oops"}, {"что-то пошло не так"}
        </div>
        <div className="bg-redOpacity py-2 px-3 rounded-md text-red">
          {
            // @ts-ignore
            error.message
          }
        </div>
        <div
          onClick={() => reloadPage()}
          className="hover:opacity-80 transition-opacity cursor-pointer px-3 py-2 rounded-xl mt-4 bg-accentOpacity text-accent"
        >
          Перезагрузить
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
