import { Vote } from '@prisma/client';
import { Factory } from 'react';

export type CachedPost = {
  id: string;
  title: string;
  authorUsername: string;
  image: string;
  slugPost: string;
  content: string;
  currentVote: Vote['type'] | null;
  createdAt: Date;
  published: boolean;
};
