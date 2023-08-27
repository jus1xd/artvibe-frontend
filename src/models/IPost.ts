export interface IPost {
  _id: string;
  text: string;
  pictures: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  createdAt: string;
  likes: number;
  comments: IComment[];
}

export interface IComment {
  text: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  createdAt: string;
}
