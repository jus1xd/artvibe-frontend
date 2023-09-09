import { IFriend } from "./IFriend";
import { IPost } from "./IPost";

export interface IUser {
  _id: string;
  avatar: string;
  name: string;
  username: string;
  email: string;
  city: string;
  status: string;
  isOnline: boolean;
  lastOnline: string;
  password: string;
  friends: IFriend[];
  posts: IPost[];
  pageCover: string;
  role: string;
  isVerified: boolean;
}
