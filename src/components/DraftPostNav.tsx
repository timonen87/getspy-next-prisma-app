'use client';

import { User } from 'next-auth';
import UserAvatar from './UserAvatar ';
import { FC } from 'react';
import { signOut } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import {
  PostCreatoionRequest,
  PostPublishRequest,
  PostValidator,
} from '@/lib/validators/post';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';

interface DraftPostNavProps {
  postId: string;
}

const DraftPostNav: FC<DraftPostNavProps> = ({ postId }) => {
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>...</DropdownMenuTrigger>

      <DropdownMenuContent className=" bg-white" align="end">
        <DropdownMenuItem asChild>
          <button onClick={() => {}}>Редактрировать</button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <button onClick={() => publishPost({ postId })}>Опубликовать</button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <button onClick={() => {}}>Удалить</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DraftPostNav;
