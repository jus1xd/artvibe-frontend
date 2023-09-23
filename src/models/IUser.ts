import { IFriend } from "./IFriend";
import { IPost } from "./IPost";

export interface IUser {
  _id: string;
  avatar: string;
  fullname: string;
  username: string;
  email: string;
  city: string;
  status: string;
  isOnline: boolean;
  lastOnline: string;
  password: string;
  friends: [
    {
      friendId: string;
    }
  ];
  posts: [
    {
      postId: string;
    }
  ];
  pageCover: string;
  role: string;
  isVerified: boolean;
}
