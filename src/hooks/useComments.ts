'use client';
import { db } from '@/lib/db';
import { CommentItem } from '@/types/db';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface UseCommentsProps {
  setComments: Dispatch<SetStateAction<CommentItem[]>>;
  comments: CommentItem[];
}

export const useComments = ({}): UseCommentsProps => {
  const [comments, setComments] = useState<CommentItem[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const arr = await db.comment.findMany({
          orderBy: {
            createdAt: 'desc',
          },
        });
        setComments(arr);
      } catch (error) {
        console.warn('Commets', error);
      }
    })();
  }, []);
  return { comments, setComments };
};
