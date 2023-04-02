export interface IUser {
  _id?: number;
  name: string;
  email: string;
  username: string;
  role: "admin" | "user";
  password: string;
}