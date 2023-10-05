import LeftButton from '@/components/LeftButton';
import CustomFeed from '@/components/home/CustomFeed';
import GeneralFeed from '@/components/home/GeneralFeed';

import { getAuthSession } from '@/lib/auth';

import SideCategory from '@/components/SideCategory';
import SideComments from '@/components/SideComments';
import SideCategoryItem from '@/components/SideCategoryItem';
import { db } from '@/lib/db';
import SideCommnetsItem from '@/components/SideCommenItem';
import { Users } from 'lucide-react';

export default async function Home() {
  const category = await db.category.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      posts: true,
    },
  });
  const comments = await db.comment.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      post: {
        include: {
          category: true,
        },
      },
      author: true,
    },
  });

  const session = await getAuthSession();

  return (
    <>
      {/* <h1 className="font-bold text-3xl md:text-4xl">Лента</h1> */}
      <div className="grid sm:grid-cols-1 md:gap-x-4 md:grid-cols-5 xl:grid-cols-7 py-6">
        <div className="hidden w-full min-w-100 md:block col-auto">
          <LeftButton />

          {session ? <SideCategoryItem category={category} /> : ''}
        </div>
        <ul className="flex flex-col md:col-span-4 xl:col-span-4 space-y-6">
          {/* @ts-expect-error server component */}
          {session ? <CustomFeed /> : <GeneralFeed />}
        </ul>

        {/* subreddit info */}
        <div className=" hidden flex-col gap-4 xl:block col-span-2">
          {/* <div className="overflow-hidden h-fit rounded-lg border border-gray-200 gap-2 mb-2">
            <div className="px-3 py-2 bg-slate-50">
              <p className="font-semibold py-3 px-3 flex items-center gap-1.5">
                <User className="h-6 w-6" />
                Админ панель
              </p>
            </div>
            <dl className="divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white">
              <div className="flex flex-col gap-x-4 py-3">
                <dt className="text-gray-500">Создать новую ленту</dt>

                <Link
                  className={buttonVariants({
                    className: 'w-full mt-4 mb-6',
                  })}
                  href="/cat/create"
                >
                  Создать ленту
                </Link>
              </div>
            </dl>
          </div> */}
          <div className=" mb-4">
            <SideCommnetsItem comments={comments} />
          </div>
        </div>
      </div>
    </>
  );
}
