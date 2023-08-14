import { IFriend } from "./IFriend";

export interface IUser {
  _id: string;
  avatar: string;
  name: string;
  username: string;
  email: string;
  city: string;
  status: string;
  password: string;
  friends: IFriend[];
  pageCover: string;
  role: string;
  isVerified: boolean;
}
