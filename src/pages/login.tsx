import React, { useEffect, useState } from "react";

import loginbg from "../assets/img/auth/loginbg.svg";
import Container from "../components/Container";

import logo from "../assets/img/logoLight.svg";
import { NavLink, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useActions } from "../hooks/actions";
import { authApi } from "../store/services/authService";

type TProps = {
  setTheme: (theme: string) => void;
};

const Login: React.FC<TProps> = ({ setTheme }) => {
  const [remember, setRemember] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  const [loginUser, { data, error }] = authApi.useLoginUserMutation();
  const { login } = useActions();

  const loginHandler = () => {
    loginUser({
      email,
      password,
    });
  };

  useEffect(() => {
    setTheme("hidden");
    if (data) {
      login(data);
      navigate("/show");
    }
  });

  useEffect(() => {
    if (error) {
      // @ts-ignore
      setErrorMessage(error.data.message);
    }
  }, [error]);

  return (
    <>
      <div className="">
        <div className="">
          <div className="absolute z-20 w-screen h-screen top-[-40px] left-0 overflow-auto">
            <svg
              className="h-[50%] sm:h-auto sm:w-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 457"
              fill="none"
            >
              <path
                d="M0 152.68L1440 -19V67.0904L0 457V152.68Z"
                fill="url(#paint0_linear_18_178)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_18_178"
                  x1="720.25"
                  y1="-19"
                  x2="720.25"
                  y2="501.046"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#635BFF" />
                  <stop offset="1" stopColor="#FF5B5B" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <Container border>
            <div className="flex justify-center w-full sm:w-1/3 border-dashed border-x border-[#22222220] mx-auto">
              <div className="flex justify-center items-center w-full h-screen">
                <div className="relative w-full z-30 flex items-center flex-col justify-center h-screen">
                  <div className="mb-8 pl-[15px] w-full">
                    <img className="w-max mr-auto" src={logo} alt="" />
                  </div>
                  <div className="relative z-50 w-full bg-white rounded-md p-5 shadow-md">
                    <div className="text-title font-medium mt-3 mb-5 text-xl">
                      Войти в аккаунт
                    </div>
                    <div className="flex flex-col mb-4">
                      <div className="text-sm text-[#222222] mb-2 text-[#22222290]">
                        Почта
                      </div>
                      <Input
                        type="auth"
                        value={email}
                        placeholder="example@gmail.com"
                        setValue={setEmail}
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="text-sm text-[#222222] mb-2 text-[#22222290]">
                        Пароль
                      </div>
                      <Input
                        type="auth"
                        hidden
                        value={password}
                        placeholder="Пароль"
                        setValue={setPassword}
                      />
                    </div>
                    {/* write custom checkbox here  */}
                    <div className="flex items-center mt-4">
                      <div className="checkbox_wrapper">
                        <input
                          onClick={() => {
                            setRemember(!remember);
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
                    {/* error message here  */}
                    <div className="text-redpal-500 mt-2 min-h-[25px]">
                      {errorMessage}
                    </div>
                    <div className="mt-2">
                      <div
                        onClick={loginHandler}
                        className="py-2 cursor-pointer bg-accent text-white rounded-md text-center font-medium transition duration-300 hover:opacity-80"
                      >
                        Войти
                      </div>
                    </div>
                  </div>
                  {/* no account  */}
                  <div className="mt-5 w-full pl-[15px]">
                    <div className="text-sm text-[#222222] text-left mb-3">
                      Нет аккаунта?{" "}
                      <NavLink to={"/register"} className="text-accent">
                        Зарегистрироваться
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
};

export default Login;
