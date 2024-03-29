import Editor from '@/components/Editor';
import { Button } from '@/components/ui/Button';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import { FC } from 'react';

interface PageProps {
  params: {
    slug: string;
  };
}

const page = async ({ params }: PageProps) => {
  const category = await db.category.findFirst({
    where: {
      name: params.slug,
    },
  });

  if (!category) {
    return notFound();
  }
  return (
    <div className="flex flex-col items-start gap-2">
      <div className="border-b border-gray-200 pb-5">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 className="ml-2 mt-2 text-base font-semibold leading-6 text-gray-900">
            Сохранить
          </h3>
          <p className="ml-2 mt-1 truncate text-sm text-gray-500">
            в @{params.slug}
          </p>
        </div>
      </div>

      <Editor categoryId={category.id} />

      <div className="w-full flex justify-end gap-2">
        <Button type="submit" className="w-full" form="category-post-form">
          Отправить на модерацию
        </Button>
        {/* <Button
          type="submit"
          variant="subtle"
          className="w-full"
          form="category-post-form"
        >
          Сохранить черновик
        </Button> */}
      </div>
    </div>
  );
};

export default page;
