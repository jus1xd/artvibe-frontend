import React, { useEffect, useState } from "react";
import ts from "typescript";
import { IAuthor } from "../models/IAuthor";
import { authorsApi } from "../store/services/authorService";
import { countriesApi } from "../store/services/countriesService";
import { picturesApi } from "../store/services/pictureService";

type TProps = {
  model: "author" | "picture" | "country" | "user" | "3d";
};

const CreateCard: React.FC<TProps> = ({ model }) => {
  // состояние для автора
  const [fullname, setFullname] = useState<string>("");
  const [birthdate, setBirthdate] = useState<string>("");
  const [deathdate, setDeathdate] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  // состояние для картины
  const [title, setTitle] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [year, setYear] = useState<number>(0);
  const [author, setAuthor] = useState<string>("");
  const [imagePicture, setImagePicture] = useState<File | null>(null);

  // состояние для стран
  const [countryName, setCountryName] = useState<string>("");
  const [imageCountry, setImageCountry] = useState<File | null>(null);

  const clearValues = () => {
    setFullname("");
    setBirthdate("");
    setDeathdate("");
    setCountry("");
    setTitle("");
    setColor("");
    setYear(0);
    setAuthor("");
    setCountryName("");
    setImagePicture(null);
    setImageCountry(null);
    setImage(null);
  };

  const [createAuthor, {}] = authorsApi.useCreateAuthorMutation();
  const [createPicture, {}] = picturesApi.useCreatePictureMutation();
  const [createCountry, {}] = countriesApi.useCreateCountryMutation();

  const submitHandler = () => {
    switch (model) {
      case "author":
        const authorData = new FormData();
        authorData.append("fullname", fullname);
        authorData.append("birthdate", birthdate);
        authorData.append("deathdate", deathdate);
        authorData.append("country", country);
        authorData.append("image", image!);
        // @ts-ignore
        createAuthor(authorData).unwrap();
        clearValues();
        break;
      case "picture":
        const pictureData = new FormData();
        pictureData.append("title", title);
        pictureData.append("color", color);
        pictureData.append("year", year.toString());
        pictureData.append("author", author);
        pictureData.append("image", imagePicture!);
        // @ts-ignore
        createPicture(pictureData).unwrap();
        clearValues();
        break;
      case "country":
        const countryData = new FormData();
        countryData.append("name", countryName);
        countryData.append("image", imageCountry!);
        // @ts-ignore
        createCountry(countryData).unwrap();
        clearValues();
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-[calc(25%-10px)] h-max mr-[10px] mb-3 p-3 border border-inputBorder rounded-lg">
      {model === "author" ? (
        <div className="flex flex-col">
          <input
            type="text"
            required
            placeholder="Полное имя"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="px-3 w-full py-1 mb-2 outline-none rounded-md border border-inputBorder"
          />
          <input
            type="text"
            required
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            placeholder="Дата рождения"
            className="px-3 w-full py-1 mb-2 outline-none rounded-md border border-inputBorder"
          />
          <input
            type="text"
            value={deathdate}
            onChange={(e) => setDeathdate(e.target.value)}
            placeholder="Дата смерти"
            className="px-3 w-full py-1 mb-2 outline-none rounded-md border border-inputBorder"
          />
          <input
            type="text"
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Страна"
            className="px-3 w-full py-1 mb-2 outline-none rounded-md border border-inputBorder"
          />
          <label
            htmlFor="fileLoader"
            className="px-3 w-full cursor-pointer py-1 mb-2 outline-accent rounded-md border border-accent"
          >
            <input
              type="file"
              required
              id="fileLoader"
              onChange={(e) =>
                // @ts-ignore
                setImage(e.target.files[0])
              }
              placeholder="Изображение"
              className="appearance-none hidden"
            />
            <span className="text-accent cursor-pointer">Загрузить файл</span>
          </label>
        </div>
      ) : model === "picture" ? (
        <div className="flex flex-col">
          <input
            type="text"
            required
            placeholder="Название"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-3 w-full py-1 mb-2 outline-none rounded-md border border-inputBorder"
          />
          <input
            type="text"
            required
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="Цвет"
            className="px-3 w-full py-1 mb-2 outline-none rounded-md border border-inputBorder"
          />
          <input
            type="number"
            required
            onChange={(e) => setYear(+e.target.value)}
            placeholder="Дата написания"
            className="px-3 w-full py-1 mb-2 outline-none rounded-md border border-inputBorder"
          />
          <input
            type="text"
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Автор"
            className="px-3 w-full py-1 mb-2 outline-none rounded-md border border-inputBorder"
          />
          <label
            htmlFor="fileLoader2"
            className="px-3 w-full cursor-pointer py-1 mb-2 outline-accent rounded-md border border-accent"
          >
            <input
              type="file"
              required
              id="fileLoader2"
              onChange={(e) =>
                // @ts-ignore
                setImagePicture(e.target.files[0])
              }
              placeholder="Изображение"
              className="appearance-none hidden"
            />
            <span className="text-accent cursor-pointer">Загрузить файл</span>
          </label>
        </div>
      ) : model === "country" ? (
        <div className="flex flex-col">
          <input
            type="text"
            required
            placeholder="Название"
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
            className="px-3 w-full py-1 mb-2 outline-none rounded-md border border-inputBorder"
          />
          <label
            htmlFor="fileLoader3"
            className="px-3 w-full cursor-pointer py-1 mb-2 outline-accent rounded-md border border-accent"
          >
            <input
              type="file"
              required
              id="fileLoader3"
              onChange={(e) =>
                // @ts-ignore
                setImageCountry(e.target.files[0])
              }
              placeholder="Изображение"
              className="appearance-none hidden"
            />
            <span className="text-accent cursor-pointer">Загрузить файл</span>
          </label>
        </div>
      ) : null}
      <div
        className="w-full mt-2 bg-accent text-white rounded cursor-pointer text-center py-1 px-4"
        onClick={submitHandler}
      >
        Создать
      </div>
    </div>
  );
};

export default CreateCard;
