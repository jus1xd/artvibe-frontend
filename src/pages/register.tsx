import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Container from "../components/Container";

import registerBg from "../assets/img/auth/registerbg.png";
import logo from "../assets/img/logoLight.svg";
import Input from "../components/Input";
import { authApi } from "../store/services/authService";
import { useActions } from "../hooks/actions";

const Register = () => {
  const [remember, setRemember] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [avatar, setAvatar] = useState<File | "">("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  const [createUser, { data, error }] = authApi.useCreateUserMutation();
  const { register } = useActions();

  const registerHandler = () => {
    const userData = new FormData();
    userData.append("name", name);
    userData.append("avatar", avatar);
    userData.append("username", username);
    userData.append("email", email);
    userData.append("role", "user");
    userData.append("password", password);
    createUser(userData).unwrap();
    // navigate("/show");
  };

  useEffect(() => {
    if (data) {
      register(data);
      navigate("/show");
    }
  });

  useEffect(() => {
    if (error) {
      // @ts-ignore
      setErrorMessage(error.data.errors.errors[0].msg);
    }
  }, [error]);

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
                    <div className="text-title font-medium mt-1 mb-3 text-xl">
                      Зарегистрироваться
                    </div>
                    <div className="flex flex-col mb-2">
                      <div className="text-sm text-[#222222] mb-2 text-[#22222290]">
                        Имя
                      </div>
                      <Input
                        type="auth"
                        value={name}
                        placeholder="Владислав"
                        setValue={setName}
                      />
                    </div>
                    <div className="flex flex-col mb-2">
                      <div className="text-sm text-[#222222] mb-2 text-[#22222290]">
                        Имя пользователя
                      </div>
                      <Input
                        type="auth"
                        value={username}
                        placeholder="jus1xd"
                        setValue={setUsername}
                      />
                    </div>
                    <div className="flex flex-col mb-2">
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
                    <div className="flex flex-col mb-2">
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
                    <div className="flex flex-col">
                      <div className="text-sm text-[#222222] mb-2 text-[#22222290]">
                        Повторите пароль
                      </div>
                      <Input
                        type="auth"
                        hidden
                        value={repeatPassword}
                        placeholder="Повторите пароль"
                        setValue={setRepeatPassword}
                      />
                    </div>

                    <div className="mt-3 w-full">
                      <label
                        htmlFor="fileLoader"
                        className="px-3 w-full cursor-pointer py-1 mb-2 outline-accent rounded-md border border-accent opacity-80 transition hover:opacity-100"
                      >
                        <input
                          type="file"
                          required
                          id="fileLoader"
                          onChange={(e) => setAvatar(e.target.files![0])}
                          placeholder="Изображение"
                          className="appearance-none hidden"
                        />
                        <span className="text-accent cursor-pointer">
                          Загрузить фото
                        </span>
                      </label>
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
                          className="ml-[-10%] mt-[-2px] w-max text-sm"
                        >
                          Согласен с политикой конфиденциальности
                        </label>
                      </div>
                    </div>
                    {/* error message here  */}
                    <div className="text-redpal-500 mt-1 min-h-[25px]">
                      {errorMessage}
                    </div>
                    <div className="mt-2">
                      {remember ? (
                        <button
                          onClick={registerHandler}
                          className="py-2 w-full cursor-pointer bg-accent text-white rounded-md text-center font-medium transition duration-300 hover:opacity-80"
                        >
                          Зарегистрироваться
                        </button>
                      ) : (
                        <button className="py-2 w-full cursor-default opacity-70 select-none bg-accent text-white rounded-md text-center font-medium transition duration-300">
                          Зарегистрироваться
                        </button>
                      )}
                    </div>
                  </div>
                  {/* no account  */}
                  <div className="mt-5 w-full pl-[15px]">
                    <div className="text-sm text-[#222222] text-left mb-3">
                      Уже есть аккаунт?{" "}
                      <NavLink to={"/login"} className="text-accent">
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
};

export default Register;
