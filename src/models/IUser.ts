import { IFriend } from "./IFriend";

export interface IUser {
  _id?: string;
  name: string;
  username: string;
  email: string;
  password: string;
  friends: IFriend[];
  avatar: string;
  role: string;
}
