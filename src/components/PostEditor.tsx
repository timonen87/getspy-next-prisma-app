'use client';
import EditorJS, { OutputData } from '@editorjs/editorjs';

import { FC, useCallback, useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useForm } from 'react-hook-form';
import { PostUpdateRequest, PostValidator } from '@/lib/validators/post';
import { zodResolver } from '@hookform/resolvers/zod';
import { uploadFiles } from '@/lib/uploadthing';
import { toast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';

interface EditorProps {
  categoryId: string;
  initialData?: any;
}

const PostEditor: FC<EditorProps> = ({ categoryId, initialData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostUpdateRequest>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      categoryId,
      title: initialData?.title,
      content: initialData.content.blocks,
    },
  });

  const ref = useRef<EditorJS>();
  const [isMounted, setIsMounted] = useState<boolean>();
  const router = useRouter();
  const pathname = usePathname();
  const _titleRef = useRef<HTMLTextAreaElement>(null);

  const { mutate: updatePost } = useMutation({
    mutationFn: async ({
      title,
      content,
      categoryId,
      slug,
    }: PostUpdateRequest) => {
      const payload: PostUpdateRequest = {
        categoryId,
        title,
        content,
        slug,
      };

      //   const currentPostId = pathname.split('/').slice(-1).join();
      const { data } = await axios.patch('/api/category/post/edit', payload);
      return data;
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
        description: 'Ваш пост сохранен.',
      });
    },
  });

  const initializeEditor = useCallback(async () => {
    const EditirJS = (await import('@editorjs/editorjs')).default;
    const Header = (await import('@editorjs/header')).default;
    const Embed = (await import('@editorjs/embed')).default;
    const Table = (await import('@editorjs/table')).default;
    const List = (await import('@editorjs/list')).default;
    const Code = (await import('@editorjs/code')).default;
    const LinkTool = (await import('@editorjs/link')).default;
    const InlineCode = (await import('@editorjs/inline-code')).default;
    const ImageTool = (await import('@editorjs/image')).default;

    // const currentData = initialData?.content?.blocks;
    // const slug = initialData.slug;

    if (!ref.current) {
      const editor = new EditirJS({
        holder: 'editor',
        onReady() {
          ref.current = editor;
        },
        placeholder: 'Здесь вы можете написать свой пост',
        inlineToolbar: true,
        data: {
          blocks: [...initialData.content.blocks],
        },

        tools: {
          header: Header,
          LinkTool: {
            class: LinkTool,
            config: {
              endpoint: '/api/link',
            },
          },

          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const [res] = await uploadFiles([file], 'imageUploader');

                  return {
                    success: 1,
                    file: {
                      url: res.fileUrl,
                    },
                  };
                },
              },
            },
          },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [_key, value] of Object.entries(errors)) {
        value;
        toast({
          title: 'Что то произошло.',
          description: (value as { message: string }).message,
          variant: 'destructive',
        });
      }
    }
  }, [errors]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();

      setTimeout(() => {
        _titleRef.current?.focus();
      });
    };

    if (isMounted) {
      init();
      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  async function onSubmit(data: PostUpdateRequest) {
    const blocks = await ref.current?.save();

    const payload: PostUpdateRequest = {
      title: data.title,
      content: blocks,
      categoryId,
      slug: initialData.slug,
    };

    updatePost(payload);
  }

  if (!isMounted) {
    return null;
  }
  const { ref: titleRef, ...rest } = register('title');

  //   const currentPostId = pathname.split('/').slice(-1).join();

  return (
    <div className="w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200">
      <form
        id="category-post-form"
        className="w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="prose prose-stone dark:prose-invert">
          <TextareaAutosize
            ref={(e) => {
              titleRef(e);
              //@ts-ignore
              _titleRef.current = e;
            }}
            {...rest}
            placeholder="Заголовок"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
          />

          <div id="editor" className="min-h-[500px] w-full" />
          <p className="text-sm text-gray-500">
            Используйте{' '}
            <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
              Tab
            </kbd>{' '}
            чтобы открыть меню редактора
          </p>
        </div>
      </form>
    </div>
  );
};

export default PostEditor;
