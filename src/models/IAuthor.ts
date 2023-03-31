export interface IAuthor {
  _id?: number;
  fullname: string;
  birthdate: string;
  deathdate: string;
  country: string;
  image: File | null;
}