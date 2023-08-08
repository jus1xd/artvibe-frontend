import { IMessage } from "./IMessage";

export interface IFriend {
  _id: string;
  name: string;
  avatar: string;
  messages: IMessage[];
}
