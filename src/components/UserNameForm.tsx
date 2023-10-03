'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { UsernameValidator } from '@/lib/validators/username';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<User, 'id' | 'username'>;
}

type FormData = z.infer<typeof UsernameValidator>;

export function UserNameForm({ user, className, ...props }: UserNameFormProps) {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(UsernameValidator),
    defaultValues: {
      name: user?.username || '',
    },
  });

  const { mutate: updateUsername, isLoading } = useMutation({
    mutationFn: async ({ name }: FormData) => {
      const payload: FormData = { name };

      const { data } = await axios.patch(`/api/username/`, payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: 'Такое имя уже существует.',
            description: 'Пожалуйста выберите другое имя.',
            variant: 'destructive',
          });
        }
      }

      return toast({
        title: 'Что-то произошло.',
        description: 'Ваше имя не удалось обрновить. Попробуйте позжу',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      toast({
        description: 'Ваще имя успешно изменено👋 ',
      });
      router.refresh();
    },
  });

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit((e) => updateUsername(e))}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle>Ваше имя</CardTitle>
          <CardDescription>
            Пожалуйста выберете имя, которое будет использоваться на сайте
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative grid gap-1">
            <div className="absolute top-0 left-0 w-8 h-10 grid place-items-center">
              <span className="text-sm text-zinc-400"></span>
            </div>
            <Label className="sr-only" htmlFor="name">
              Имя
            </Label>
            <Input
              id="name"
              className="w-[400px] pl-2"
              size={32}
              {...register('name')}
            />
            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button isLoading={isLoading}>Изменить</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
