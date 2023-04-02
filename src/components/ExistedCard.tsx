import React from "react";
import { authorsApi } from "../store/services/authorService";
import { authApi } from "../store/services/authService";
import { countriesApi } from "../store/services/countriesService";
import { picturesApi } from "../store/services/pictureService";

type TProps = {
  model: "author" | "picture" | "country" | "user" | "3d";
  data: any;
};

const ExistedCard: React.FC<TProps> = ({ model, data }) => {
  const [deleteAuthor] = authorsApi.useDeleteAuthorMutation();
  const [deletePicture] = picturesApi.useDeletePictureMutation();
  const [deleteCountry] = countriesApi.useDeleteCountryMutation();
  const [deleteUser] = authApi.useDeleteUserMutation();

  const deleteHandler = () => {
    switch (model) {
      case "author":
        deleteAuthor(data._id);
        break;
      case "picture":
        deletePicture(data._id);
        break;
      case "country":
        deleteCountry(data._id);
        break;
      case "user":
        deleteUser(data._id);
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-[calc(25%-10px)] min-w-[150px] h-max relative mr-[10px] mb-3 p-3 bg-white z-20 border border-inputBorder rounded-lg">
      {model === "author" ? (
        <div className="flex flex-col ">
          <div className="mb-1">
            <input
              type="text"
              disabled
              value={data.fullname}
              placeholder="Имя"
              className="px-3 w-full py-1 outline-none rounded-md bg-[#D7D7D7]"
            />
          </div>
          <div className="max-h-[200px] overflow-hidden flex items-center rounded-md mb-2">
            <img
              src={`http://localhost:5003/${data.image}`}
              className="relative z-0"
              alt=""
            />
          </div>
          <div className="mb-1">
            <span className="text-sm mb-2">Дата рождения</span>
            <input
              type="text"
              disabled
              value={data.birthdate}
              placeholder="Дата рождения"
              className="px-3 w-full py-1 outline-none rounded-md bg-[#D7D7D7]"
            />
          </div>
          <div className="mb-1">
            <span className="text-sm mb-2">Дата смерти</span>
            <input
              type="text"
              disabled
              value={data.deathdate}
              placeholder="Дата смерти"
              className="px-3 w-full py-1 outline-none rounded-md bg-[#D7D7D7]"
            />
          </div>
          <div className="mb-1">
            <span className="text-sm mb-2">Страна</span>
            <input
              type="text"
              disabled
              value={data.country}
              placeholder="Страна"
              className="px-3 w-full py-1 outline-none rounded-md bg-[#D7D7D7]"
            />
          </div>
        </div>
      ) : model === "picture" ? (
        <div className="flex flex-col">
          <input
            type="text"
            required
            disabled
            value={data.title}
            placeholder="Цвет"
            className="px-3 w-full py-1 mb-2 outline-none rounded-md bg-[#D7D7D7]"
          />
          <div className="h-[150px] bg-[#D7D7D7] overflow-hidden flex items-center rounded-md mb-2">
            <img
              src={`http://localhost:5003/${data.image}`}
              className="relative z-0 rounded-md object-cover h-auto w-full"
              alt=""
            />
          </div>
          <span className="text-sm mb-1">Цвет</span>
          <input
            type="text"
            required
            disabled
            value={data.color}
            placeholder="Цвет"
            className="px-3 w-full py-1 mb-2 outline-none rounded-md bg-[#D7D7D7]"
          />
          <span className="text-sm mb-1">Год написания</span>
          <input
            type="text"
            required
            disabled
            value={data.year}
            placeholder="Год написания"
            className="px-3 w-full py-1 mb-2 outline-none rounded-md bg-[#D7D7D7]"
          />
          <span className="text-sm mb-1">Автор</span>
          <input
            type="text"
            required
            disabled
            value={data.author}
            placeholder="Автор"
            className="px-3 w-full py-1 mb-2 outline-none rounded-md bg-[#D7D7D7]"
          />
        </div>
      ) : model === "country" ? (
        <div className="flex flex-col">
          <div className="font-bold mb-1">{data.name}</div>
          <div className="max-h-[200px] overflow-hidden flex items-center rounded-md mb-2">
            <img
              src={`http://localhost:5003/${data.image}`}
              className="relative z-0"
              alt=""
            />
          </div>
        </div>
      ) : model === "user" ? (
        <div className="flex flex-col">
          <span className="text-sm mb-1">Имя пользователя</span>
          <input
            type="text"
            required
            disabled
            value={data.username}
            placeholder="Имя"
            className="px-3 w-full py-1 mb-2 outline-none rounded-md bg-[#D7D7D7]"
          />
          <span className="text-sm mb-1">Имя</span>
          <input
            type="text"
            required
            disabled
            value={data.name}
            placeholder="Имя"
            className="px-3 w-full py-1 mb-2 outline-none rounded-md bg-[#D7D7D7]"
          />
          <span className="text-sm mb-1">Почта</span>
          <input
            type="text"
            required
            disabled
            value={data.email}
            placeholder="Почта"
            className="px-3 w-full py-1 mb-2 outline-none rounded-md bg-[#D7D7D7]"
          />
          <span className="text-sm mb-1">Роль</span>
          <input
            type="text"
            required
            disabled
            value={data.role}
            placeholder="Роль"
            className="px-3 w-full py-1 mb-2 outline-none rounded-md bg-[#D7D7D7]"
          />
          <span className="text-sm mb-1">Пароль</span>
          <input
            type="password"
            required
            disabled
            value={data.password}
            placeholder="Пароль"
            className="px-3 w-full py-1 mb-2 bg-[#D7D7D7] outline-none rounded-md"
          />
        </div>
      ) : null}
      <div
        className="w-full mt-2 bg-red text-white rounded cursor-pointer text-center py-1 px-4 opacity-80 transition hover:opacity-100"
        onClick={() => deleteHandler()}
      >
        Удалить
      </div>
    </div>
  );
};

export default ExistedCard;
