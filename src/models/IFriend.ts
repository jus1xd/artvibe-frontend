import { IMessage } from "./IMessage";

export interface IFriend {
  _id: string;
  fullname: string;
  avatar: string;
  messages: IMessage[];
  isOnline: boolean;
}
