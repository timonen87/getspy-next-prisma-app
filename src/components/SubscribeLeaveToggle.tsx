'use client';
import { FC } from 'react';
import { Button } from './ui/Button';
import { useMutation } from '@tanstack/react-query';
import { SubscribeToCategoryPayload } from '@/lib/validators/category';
import axios, { AxiosError } from 'axios';
import { toast, useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { startTransition } from 'react';
import { useCustomToasts } from '@/hooks/use-custom-toasts';

interface SubscribeLeaveToggleProps {
  isSubcribed: boolean;
  categoryId: string;
  categoryName: string;
}

const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> = ({
  categoryId,
  isSubcribed,
  categoryName,
}: SubscribeLeaveToggleProps) => {
  const { toast } = useToast();
  const { loginToast } = useCustomToasts();
  const router = useRouter();

  const { mutate: subscribe, isLoading: isSubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToCategoryPayload = {
        categoryId,
      };

      const { data } = await axios.post('/api/category/subscribe', payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }
    },
    onSuccess: () => {
      startTransition(() => {
        // Refresh the current route and fetch new data from the server without
        // losing client-side browser or React state.
        router.refresh();
      });
      toast({
        title: 'Подписка!',
        description: `Вы подписались на категорию @${categoryName}`,
      });
    },
  });

  const { mutate: unsubscribe, isLoading: isUnsubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToCategoryPayload = {
        categoryId,
      };

      const { data } = await axios.post('/api/category/unsubscribe', payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }
    },
    onSuccess: () => {
      startTransition(() => {
        // Refresh the current route and fetch new data from the server without
        // losing client-side browser or React state.
        router.refresh();
      });
      toast({
        title: 'Вы покинули канал',
        description: `Вы отподписались от @${categoryName}`,
      });
    },
  });

  return isSubcribed ? (
    <Button
      className="w-full mt-1 mb-4"
      onClick={() => unsubscribe()}
      isLoading={isUnsubLoading}
    >
      Отписаться
    </Button>
  ) : (
    <Button
      className="w-full mt-1 mb-4"
      isLoading={isSubLoading}
      onClick={() => subscribe()}
    >
      Подписаться
    </Button>
  );
};

export default SubscribeLeaveToggle;
