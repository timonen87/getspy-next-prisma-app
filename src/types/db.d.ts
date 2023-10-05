import { Category, Post, User, Vote, Comment } from '@prisma/client';

export type ExtendedPost = Post & {
  category: Category;
  votes: Vote[];
  author: User;
  comments: Comment[];
};

export type ExtendedCategory = Category & {
  posts: Post[];
};

export type ExtendedCommnets = Comment & {
  post: Post;
  author: User;
};
