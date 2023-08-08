import React from "react";
import { authorsApi } from "../store/services/authorService";
import { authApi } from "../store/services/authService";
import { countriesApi } from "../store/services/countriesService";
import { picturesApi } from "../store/services/pictureService";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type TProps = {
  model: "author" | "picture" | "country" | "user" | "3d";
  isLoading?: boolean;
  data: any;
};

const ExistedCard: React.FC<TProps> = ({ model, data, isLoading }) => {
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
            {isLoading ? (
              <Skeleton width={195} height={30} />
            ) : (
              <input
                type="text"
                disabled
                value={data.fullname}
                placeholder="Имя"
                className="px-3 w-full py-1 outline-none rounded-md bg-[#EDEDED]"
              />
            )}
          </div>
          <div className="h-[150px] bg-[#EDEDED] overflow-hidden flex items-center rounded-md mb-2">
            {isLoading ? (
              <Skeleton width={195} height={150} />
            ) : (
              <img
                src={`http://localhost:5003/${data.image}`}
                className="relative z-0 rounded-md object-cover h-auto w-full"
                alt=""
              />
            )}
          </div>
          <div className="mb-1">
            {isLoading ? (
              <Skeleton width={195} height={15} />
            ) : (
              <span className="text-sm mb-2">Дата рождения</span>
            )}
            {isLoading ? (
              <Skeleton width={195} height={29} />
            ) : (
              <input
                type="text"
                disabled
                value={data.birthdate}
                placeholder="Дата рождения"
                className="px-3 w-full py-1 outline-none rounded-md bg-[#EDEDED]"
              />
            )}
          </div>
          <div className="mb-1">
            {isLoading ? (
              <Skeleton width={195} height={15} />
            ) : (
              <span className="text-sm mb-2">Дата смерти</span>
            )}
            {isLoading ? (
              <Skeleton width={195} height={29} />
            ) : (
              <input
                type="text"
                disabled
                value={data.deathdate}
                placeholder="Дата смерти"
                className="px-3 w-full py-1 outline-none rounded-md bg-[#EDEDED]"
              />
            )}
          </div>
          <div className="mb-1">
            {isLoading ? (
              <Skeleton width={195} height={15} />
            ) : (
              <span className="text-sm mb-2">Страна</span>
            )}
            {isLoading ? (
              <Skeleton width={195} height={29} />
            ) : (
              <input
                type="text"
                disabled
                value={data.country}
                placeholder="Страна"
                className="px-3 w-full py-1 outline-none rounded-md bg-[#EDEDED]"
              />
            )}
          </div>
        </div>
      ) : model === "picture" ? (
        <div className="flex flex-col">
          {isLoading ? (
            <div className="mb-2">
              <Skeleton width={195} height={29} />
            </div>
          ) : (
            <input
              type="text"
              required
              disabled
              value={data.title}
              placeholder="Цвет"
              className="px-3 w-full py-1 mb-2 outline-none rounded-md bg-[#EDEDED]"
            />
          )}
          {isLoading ? (
            <div className="mb-2">
              <Skeleton width={195} height={145} />
            </div>
          ) : (
            <div className="h-[150px] bg-[#EDEDED] overflow-hidden flex items-center rounded-md mb-2">
              <img
                src={`http://localhost:5003/${data.image}`}
                className="relative z-0 rounded-md object-cover h-auto w-full"
                alt=""
              />
            </div>
          )}
          {isLoading ? (
            <Skeleton width={195} height={16} />
          ) : (
            <span className="text-sm mb-1">Цвет</span>
          )}
          {isLoading ? (
            <div className="mb-2">
              <Skeleton width={195} height={29} />
            </div>
          ) : (
            <input
              type="text"
              required
              disabled
              value={data.color}
              placeholder="Цвет"
              className="px-3 w-full py-1 mb-2 outline-none rounded-md bg-[#EDEDED]"
            />
          )}
          {isLoading ? (
            <Skeleton width={195} height={16} />
          ) : (
            <span className="text-sm mb-1">Год написания</span>
          )}
          {isLoading ? (
            <div className="mb-2">
              <Skeleton width={195} height={29} />
            </div>
          ) : (
            <input
              type="text"
              required
              disabled
              value={data.year}
              placeholder="Год написания"
              className="px-3 w-full py-1 mb-2 outline-none rounded-md bg-[#EDEDED]"
            />
          )}
          {isLoading ? (
            <Skeleton width={195} height={16} />
          ) : (
            <span className="text-sm mb-1">Автор</span>
          )}
          {isLoading ? (
            <Skeleton width={195} height={29} />
          ) : (
            <input
              type="text"
              required
              disabled
              value={data.author}
              placeholder="Автор"
              className="px-3 w-full py-1 mb-2 outline-none rounded-md bg-[#EDEDED]"
            />
          )}
        </div>
      ) : model === "country" ? (
        <div className="flex flex-col">
          <div className="font-bold mb-1 overflow-hidden rounded-md">
            {isLoading ? <Skeleton width={195} /> : data.name}
          </div>
          <div className="h-[125px] overflow-hidden flex items-center rounded-md mb-2">
            {isLoading ? (
              <Skeleton width={195} height={125} />
            ) : (
              <img
                src={`http://localhost:5003/${data.image}`}
                className="relative z-0 object-center"
                alt=""
              />
            )}
          </div>
        </div>
      ) : model === "user" ? (
        <div className="flex flex-col">
          {isLoading ? (
            <Skeleton width={195} height={16} />
          ) : (
            <span className="text-sm mb-1">Имя пользователя</span>
          )}
          {isLoading ? (
            <div className="mb-2">
              <Skeleton width={195} height={29} />
            </div>
          ) : (
            <input
              type="text"
              required
              disabled
              value={data.username}
              placeholder="Имя"
              className="px-3 w-full py-1 mb-2 outline-none rounded-md bg-[#EDEDED]"
            />
          )}
          {isLoading ? (
            <Skeleton width={195} height={16} />
          ) : (
            <span className="text-sm mb-1">Имя</span>
          )}
          {isLoading ? (
            <div className="mb-2">
              <Skeleton width={195} height={29} />
            </div>
          ) : (
            <input
              type="text"
              required
              disabled
              value={data.name}
              placeholder="Имя"
              className="px-3 w-full py-1 mb-2 outline-none rounded-md bg-[#EDEDED]"
            />
          )}
          {isLoading ? (
            <Skeleton width={195} height={16} />
          ) : (
            <span className="text-sm mb-1">Почта</span>
          )}
          {isLoading ? (
            <div className="mb-2">
              <Skeleton width={195} height={29} />
            </div>
          ) : (
            <input
              type="text"
              required
              disabled
              value={data.email}
              placeholder="Почта"
              className="px-3 w-full py-1 mb-2 outline-none rounded-md bg-[#EDEDED]"
            />
          )}
          {isLoading ? (
            <Skeleton width={195} height={16} />
          ) : (
            <span className="text-sm mb-1">Роль</span>
          )}
          {isLoading ? (
            <div className="mb-2">
              <Skeleton width={195} height={29} />
            </div>
          ) : (
            <input
              type="text"
              required
              disabled
              value={data.role}
              placeholder="Роль"
              className="px-3 w-full py-1 mb-2 outline-none rounded-md bg-[#EDEDED]"
            />
          )}
          {isLoading ? (
            <Skeleton width={195} height={16} />
          ) : (
            <span className="text-sm mb-1">Пароль</span>
          )}
          {isLoading ? (
            <Skeleton width={195} height={29} />
          ) : (
            <input
              type="password"
              required
              disabled
              value={data.password}
              placeholder="Пароль"
              className="px-3 w-full py-1 mb-2 bg-[#EDEDED] outline-none rounded-md"
            />
          )}
        </div>
      ) : null}
      <div className="overflow-hidden rounded-md">
        {isLoading ? (
          <div className="mt-2">
            <Skeleton width={195} height={32} />
          </div>
        ) : (
          <div
            className="w-full mt-2 bg-red text-white rounded cursor-pointer text-center py-1 px-4 opacity-80 transition hover:opacity-100"
            onClick={() => deleteHandler()}
          >
            Удалить
          </div>
        )}
      </div>
    </div>
  );
};

export default ExistedCard;
