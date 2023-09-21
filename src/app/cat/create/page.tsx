'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

import { toast } from '@/hooks/use-toast';

import { useCustomToasts } from '@/hooks/use-custom-toasts';
import { CreateCategoryPayload } from '@/lib/validators/category';
import { useMutation } from '@tanstack/react-query';

import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Page = () => {
  const router = useRouter();
  const [input, setInput] = useState<string>('');
  const { loginToast } = useCustomToasts();

  const { mutate: CreateCategory, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateCategoryPayload = {
        name: input,
      };
      const { data } = await axios.post('/api/category', payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: 'Такая категрия уже существет',
            description: 'Выберете другое имя для категории',
            variant: 'destructive',
          });
        }
        if (err.response?.status === 422) {
          return toast({
            title: 'Неверное название категории',
            description: 'Выберете название от 3 до 21 символов',
            variant: 'destructive',
          });
        }

        if (err.response?.status === 401) {
          return loginToast();
          // return toast({
          //   title: 'Вы не авторизованы',
          //   description: 'Вы не можете создать канал',
          //   variant: 'destructive',
          // });
        }
      }

      toast({
        title: 'Возникла ошибка',
        description: 'Категория не была создана',
        variant: 'destructive',
      });
    },
    onSuccess: (data) => {
      router.push(`/cat/${data}`);
    },
  });

  return (
    <div className="container flex items-center h-full max-2-3xl mx-auto md:w-[700px]">
      <div className="relative bg-white w-full h-fit p-4 rounded-lg space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Создать ленту</h1>
        </div>

        <hr className="bg-zinc-500 h-px" />

        <div>
          <p className="text-lg font-medium">Название </p>
          <p className="text-xs pb-2">Введите жедаемый url (slug)</p>

          <div className="relative">
            <p className="absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-400"></p>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="pl-6"
            />
          </div>
          <div className="pt-2">
            <p className="text-xs pb-2">Введите назвине категории</p>
            <div className="relative">
              <p className="absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-400"></p>
              <Input className="pl-6" />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="subtle" onClick={() => router.back()}>
            Закрыть
          </Button>
          <Button
            isLoading={isLoading}
            disabled={input.length === 0}
            onClick={() => CreateCategory()}
          >
            Создать
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
