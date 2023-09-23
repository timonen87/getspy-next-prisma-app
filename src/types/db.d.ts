import { Category, Post, User, Vote } from '@prisma/client';

export type ExtendedPost = Post & {
  category: Category;
  votes: Vote[];
  author: User;
  comments: Comment[];
};
