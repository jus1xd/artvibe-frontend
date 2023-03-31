import React, { useEffect, useState } from "react";
import { authorsApi } from "../store/services/authorService";
import { countriesApi } from "../store/services/countriesService";
import { picturesApi } from "../store/services/pictureService";

type TProps = {
  model: "author" | "picture" | "country" | "user" | "3d";
  data: any;
};

const ExistedCard: React.FC<TProps> = ({ model, data }) => {
  const [deleteAuthor, {}] = authorsApi.useDeleteAuthorMutation();
  const [deletePicture, {}] = picturesApi.useDeletePictureMutation();
  const [deleteCountry, {}] = countriesApi.useDeleteCountryMutation();

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
      default:
        break;
    }
  };

  return (
    <div className="w-[calc(25%-10px)] h-max relative mr-[10px] mb-3 p-3 border border-inputBorder rounded-lg">
      {model === "author" ? (
        <div className="flex flex-col ">
          <div className="font-bold mb-1">{data.fullname}</div>
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
              className="px-3 w-full py-1 outline-none rounded-md border border-inputBorder"
            />
          </div>
          <div className="mb-1">
            <span className="text-sm mb-2">Дата смерти</span>
            <input
              type="text"
              disabled
              value={data.birthdate}
              placeholder="Дата смерти"
              className="px-3 w-full py-1 outline-none rounded-md border border-inputBorder"
            />
          </div>
          <div className="mb-1">
            <span className="text-sm mb-2">Страна</span>
            <input
              type="text"
              disabled
              value={data.country}
              placeholder="Страна"
              className="px-3 w-full py-1 outline-none rounded-md border border-inputBorder"
            />
          </div>
        </div>
      ) : model === "picture" ? (
        <div className="flex flex-col">
          <div className="font-bold mb-1">{data.title}</div>
          <div className="max-h-[200px] overflow-hidden flex items-center rounded-md mb-2">
            <img
              src={`http://localhost:5003/${data.image}`}
              className="relative z-0"
              alt=""
            />
          </div>
          <input
            type="text"
            required
            disabled
            value={data.color}
            placeholder="Цвет"
            className="px-3 w-full py-1 mb-2 outline-none rounded-md border border-inputBorder"
          />
          <input
            type="text"
            required
            disabled
            value={data.year}
            placeholder="Год написания"
            className="px-3 w-full py-1 mb-2 outline-none rounded-md border border-inputBorder"
          />
          <input
            type="text"
            required
            disabled
            value={data.author}
            placeholder="Автор"
            className="px-3 w-full py-1 mb-2 outline-none rounded-md border border-inputBorder"
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
      ) : null}
      <div
        className="w-full mt-2 bg-red text-white rounded cursor-pointer text-center py-1 px-4"
        onClick={() => deleteHandler()}
      >
        Удалить
      </div>
    </div>
  );
};

export default ExistedCard;
