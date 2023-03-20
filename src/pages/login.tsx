import React, { useEffect, useState } from "react";

import loginbg from "../assets/img/auth/loginbg.svg";
import Container from "../components/Container";

import logo from "../assets/img/logoLight.svg";

const Login = () => {
  const [remember, setRemember] = useState<string>("nonchecked");

  useEffect(() => {
    console.log(remember + "   запомнить меня");
  }, [remember]);

  return (
    <>
      <div className="">
        <div className="absolute z-20 w-screen h-screen top-[-40px] left-0 z-[-1]">
          <img className="w-full" src={loginbg} alt="" />
        </div>
        <div className="">
          <Container>
            <div className="flex justify-center">
              <div className="relative mt-[-3%] z-10 w-1/3 flex items-center flex-col justify-center h-screen">
                <div className="mb-8 pl-[15px] w-full">
                  <img className="w-max mr-auto" src={logo} alt="" />
                </div>
                <div className="relative z-30 w-full h-1/2 bg-white rounded-md p-5 shadow-md">
                  <div className="text-title font-medium mt-5 mb-5 text-xl">
                    Войти в аккаунт
                  </div>
                  <div className="flex flex-col mb-4">
                    <div className="text-sm text-[#222222] mb-2 text-[#22222290]">
                      Почта
                    </div>
                    <input
                      className="outline-none px-[15px] py-2 border border-inputBorder rounded-md"
                      type="text"
                      placeholder="d1xys@bk.ru"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-sm text-[#222222] mb-2 text-[#22222290]">
                      Пароль
                    </div>
                    <input
                      className="outline-none px-[15px] py-2 border border-inputBorder rounded-md"
                      type="password"
                      placeholder="Введите пароль.."
                    />
                  </div>
                  {/* write custom checkbox here  */}
                  <div className="flex items-center mt-4">
                    <div className="checkbox_wrapper">
                      <input
                        onClick={() => {
                          if (remember === "nonchecked") {
                            setRemember("checked");
                          } else {
                            setRemember("nonchecked");
                          }
                        }}
                        type="checkbox"
                        id="checkbox"
                      />
                      <label className="checkmark" htmlFor="checkbox"></label>
                      <label
                        htmlFor="checkbox"
                        className="ml-[-20%] mt-[-2px] w-max text-sm"
                      >
                        Запомнить меня
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Login;
