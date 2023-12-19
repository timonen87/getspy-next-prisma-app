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

export type ExtendedCategory = Category & {
  posts: Post[];
};

export type UserCategoryBlock = Subscription & {
  category: Category[];
};

export type ExtendedCommnets = Comment & {
  post: Post & {
    category: Category;
  };
  author: User;
};

export type SideExtendedPost = Post & {
  comments: Comment[];
  category: Category;
};

export type sideMenuCategory = Category & {
  posts: Post[];
};
