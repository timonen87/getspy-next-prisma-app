'use client';

import { User } from 'next-auth';
import UserAvatar from './UserAvatar ';
import { FC } from 'react';
import { signOut } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { PostDeletePublish, PostPublishRequest } from '@/lib/validators/post';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';

interface DraftPostNavProps {
  postId: string;
  slugPost: string;
  published: boolean;
  slug: string;
}

const DraftPostNav: FC<DraftPostNavProps> = ({
  postId,
  slugPost,
  slug,
  published,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const { mutate: publishPost } = useMutation({
    mutationFn: async ({ postId }: PostPublishRequest) => {
      const payload: PostPublishRequest = {
        postId,
      };

      const {} = await axios.post('/api/posts/publish', payload);
    },
    onError: () => {
      return toast({
        title: 'Возникла ошибка.',
        description: 'Пост не опубликован. Попробуйте позже',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      const newPathname = pathname.split('/').slice(0, -1).join('/');
      router.push(newPathname);
      router.refresh();
      return toast({
        description: 'Ваш пост опубликован.',
      });
    },
  });

  const { mutate: unPublishPost } = useMutation({
    mutationFn: async ({ postId }: PostPublishRequest) => {
      const payload: PostPublishRequest = {
        postId,
      };

      const {} = await axios.post('/api/posts/unpublish', payload);
    },
    onError: () => {
      return toast({
        title: 'Возникла ошибка.',
        description: 'Пост не снят с публикации. Попробуйте позже',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      const newPathname = pathname.split('/').slice(0, -1).join('/');
      router.push(newPathname);
      router.refresh();
      return toast({
        description: 'Ваш пост cнят с публикации.',
      });
    },
  });

  const { mutate: deletePost } = useMutation({
    mutationFn: async ({ postId }: PostDeletePublish) => {
      const payload: PostDeletePublish = {
        postId,
      };

      const {} = await axios.post('/api/posts/delete', payload);
    },
    onError: () => {
      return toast({
        title: 'Возникла ошибка.',
        description: 'Пост не удален. Попробуйте позже',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      // const newPathname = pathname.split('/').slice(0, -1).join('/');
      router.push('/');
      router.refresh();
      return toast({
        description: 'Ваш пост удален.',
      });
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>...</DropdownMenuTrigger>

      <DropdownMenuContent className=" bg-white" align="end">
        <DropdownMenuItem asChild>
          <button onClick={() => {}}>
            <Link href={`/cat/${slug}/${slugPost}/edit`}>Редактрировать</Link>
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          {published == false ? (
            <button onClick={() => publishPost({ postId })}>
              Опубликовать
            </button>
          ) : (
            <button onClick={() => unPublishPost({ postId })}>
              Снять с публикации
            </button>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <button
            onClick={() => {
              deletePost({ postId });
            }}
          >
            Удалить
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DraftPostNav;
