import { IAuthor } from "./IAuthor";
import { IPicture } from "./IPicture";

export interface ICountry {
  _id?: number;
  name: string;
  image: string;
  authors: Array<IAuthor>;
  pictures: Array<IPicture>;
}