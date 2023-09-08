export interface IPost {
  _id: string;
  text: string;
  pictures: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  createdAt: string;
  likes: ILike[];
  comments: IComment[];
}

export interface IComment {
  _id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  createdAt: string;
  pictures: string;
  text: string;
}

export interface ILike {
  _id: string;
  userId: string;
  userName: string;
}
