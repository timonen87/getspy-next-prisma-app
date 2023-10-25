'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

import { toast } from '@/hooks/use-toast';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import { useCustomToasts } from '@/hooks/use-custom-toasts';
import { CreateCategoryPayload } from '@/lib/validators/category';
import { useMutation } from '@tanstack/react-query';

import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { ChangeEvent, HtmlHTMLAttributes, useState } from 'react';

import { Textarea } from '@/components/ui/Textarea';

const Page = () => {
  const router = useRouter();
  const [inputName, setInputName] = useState<string>('');
  const [inputDesc, setInputDesc] = useState<string>('');
  const [inputImg, setInputImg] = useState<string>('');
  const [file, setFile] = useState<File>();
  const { loginToast } = useCustomToasts();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  // const handleUploadClick = async () => {
  //   if (!file) {
  //     return;
  //   }

  //   // 👇 Uploading the file using the fetch API to the server
  //   await fetch('https://httpbin.org/post', {
  //     method: 'POST',
  //     body: file,
  //     // 👇 Set headers manually for single file upload
  //     headers: {
  //       'content-type': file.type,
  //       'content-length': `${file.size}`, // 👈 Headers need to be a string
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data))
  //     .catch((err) => console.error(err));
  // };

  const { mutate: CreateCategory, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateCategoryPayload = {
        name: inputName,
        description: inputDesc,
        image: inputImg,
      };

      const { data } = await axios.post('/api/category', payload);

      return data;
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
      const slug = CyrillicToTranslit()
        .transform(data, '_')
        .toLocaleLowerCase();
      router.push(`/cat/${slug}`);
    },
  });

  return (
    <div className="container flex items-center h-full max-2-3xl mx-auto md:w-[700px]">
      <div className="relative bg-white w-full h-fit p-4 rounded-lg space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Создать категорию</h1>
        </div>

        <hr className="bg-zinc-500 h-px" />

        <div>
          <p className="text-lg font-medium">Название </p>
          <p className="text-xs pb-2">Введите желамое название</p>

          <div className="relative">
            <p className="absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-400"></p>
            <Input
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              className="pl-2"
            />
          </div>
          <div className="pt-2">
            <p className="text-xs pb-2">Введите описание категории</p>
            <p className="text-xs pb-2">Не более 1000 символов</p>
            <div className="relative">
              <p className="absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-400"></p>
              <Textarea
                value={inputDesc}
                onChange={(e) => setInputDesc(e.target.value)}
                className="pl-2"
              />
            </div>
          </div>
          <div className="pt-2">
            <p className="text-xs pb-2">Введите ссылку на фото</p>
            <p className="text-xs pb-2">https://..</p>
            <div className="relative">
              <p className="absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-400"></p>
              <Input
                value={inputImg}
                onChange={(e) => setInputImg(e.target.value)}
                className="pl-2"
              />
            </div>
          </div>
          <div className="pt-4 ">
            <div>
              <Input
                className="w-80 bg-slate-300 cursor-pointer"
                type="file"
                onChange={handleFileChange}
              />

              <div className="pt-2">
                {file && `${file.name} - ${file.type}`}
              </div>
              {/* <div className="pt-4">
                <Button variant="subtle" onClick={handleUploadClick}>
                  Загрузить
                </Button>
              </div> */}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="subtle" onClick={() => router.back()}>
            Закрыть
          </Button>
          <Button
            isLoading={isLoading}
            disabled={inputName.length === 3}
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
