import React, { useEffect, useState } from "react";

import loginbg from "../assets/img/auth/loginbg.svg";
import Container from "../components/Container";

import logo from "../assets/img/logoLight.svg";
import { NavLink, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useActions } from "../hooks/actions";
import { authApi } from "../store/services/authService";

const Login = () => {
  const [remember, setRemember] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  const [loginUser, { data, error }] = authApi.useLoginUserMutation();
  const { login } = useActions();

  const loginHandler = () => {
    // @ts-ignore
    loginUser({
      email,
      password,
    });
  };

  useEffect(() => {
    if (data) {
      // @ts-ignore
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
          <Container border>
            <div className="flex justify-center w-1/3 border-dashed border-x border-[#22222220] mx-auto">
              <div className="flex justify-center items-center w-full h-screen">
                <div className="absolute z-20 w-screen h-screen top-[-40px] left-0">
                  <img className="w-full" src={loginbg} alt="" />
                </div>
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
                    <div className="text-redpal-500 mt-2 min-h-[25px]">{errorMessage}</div>
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
