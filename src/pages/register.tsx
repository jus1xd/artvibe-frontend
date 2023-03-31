import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import Container from '../components/Container';

import registerBg from "../assets/img/auth/registerbg.png";
import logo from "../assets/img/logoLight.svg";

const Register = () => {
  const [remember, setRemember] = useState<string>("nonchecked");

  useEffect(() => {
    // console.log(remember + " запомнить меня");
  }, [remember]);

  return (
    <>
      <div className="">
        <div className="">
          <Container border>
            <div className="flex justify-center w-1/3 border-dashed border-x border-[#22222220] mx-auto">
              <div className="absolute z-40 w-screen h-screen top-[-40px] left-0">
                <img className="w-full" src={registerBg} alt="" />
              </div>
              <div className="flex justify-center items-center w-full h-screen">
                <div className="relative w-full z-50 flex items-center flex-col justify-center h-max">
                  <div className="mb-8 pl-[15px] w-full">
                    <img className="w-max mr-auto" src={logo} alt="" />
                  </div>
                  <div className="relative z-30 w-full h-1/2 bg-white rounded-md p-5 shadow-md">
                    <div className="text-title font-medium mt-5 mb-5 text-xl">
                      Зарегистрироваться
                    </div>
                    <div className="flex flex-col mb-2">
                      <div className="text-sm text-[#222222] mb-2 text-[#22222290]">
                        Имя
                      </div>
                      <input
                        className="outline-none px-[15px] py-2 border border-inputBorder rounded-md"
                        type="text"
                        placeholder="Владислав"
                      />
                    </div>
                    <div className="flex flex-col mb-2">
                      <div className="text-sm text-[#222222] mb-2 text-[#22222290]">
                        Имя пользователя
                      </div>
                      <input
                        className="outline-none px-[15px] py-2 border border-inputBorder rounded-md"
                        type="text"
                        placeholder="jus1xd"
                      />
                    </div>
                    <div className="flex flex-col mb-2">
                      <div className="text-sm text-[#222222] mb-2 text-[#22222290]">
                        Почта
                      </div>
                      <input
                        className="outline-none px-[15px] py-2 border border-inputBorder rounded-md"
                        type="text"
                        placeholder="d1xys@bk.ru"
                      />
                    </div>
                    <div className="flex flex-col mb-2">
                      <div className="text-sm text-[#222222] mb-2 text-[#22222290]">
                        Пароль
                      </div>
                      <input
                        className="outline-none px-[15px] py-2 border border-inputBorder rounded-md"
                        type="password"
                        placeholder="Введите пароль"
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="text-sm text-[#222222] mb-2 text-[#22222290]">
                        Повторите пароль
                      </div>
                      <input
                        className="outline-none px-[15px] py-2 border border-inputBorder rounded-md"
                        type="password"
                        placeholder="Повторите пароль"
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
                          className="ml-[-10%] mt-[-2px] w-max text-sm"
                        >
                          Согласен с политикой конфиденциальности
                        </label>
                      </div>
                    </div>
                    <div className="mt-5">
                      <div className="py-2 cursor-pointer bg-accent text-white rounded-md text-center font-medium transition duration-300 hover:opacity-80">
                        Зарегистрироваться
                      </div>
                    </div>
                  </div>
                  {/* no account  */}
                  <div className="mt-5 w-full pl-[15px]">
                    <div className="text-sm text-[#222222] text-left mb-3">
                      Уже есть аккаунт?{" "}
                      <NavLink to={'/login'} className="text-accent">
                        Войти
                      </NavLink>
                    </div>
                    <div className="text-sm text-border">© Artvibe</div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default Register