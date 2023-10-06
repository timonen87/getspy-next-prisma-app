import LeftButton from '@/components/LeftButton';
import CustomFeed from '@/components/home/CustomFeed';
import GeneralFeed from '@/components/home/GeneralFeed';

import { getAuthSession } from '@/lib/auth';

import SideCategoryBlock from '@/components/SideCategorysBlock';
import { db } from '@/lib/db';
import SideCommnetsItem from '@/components/SideCommenItem';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/Button';
import { Menu } from 'lucide-react';

export default async function Home() {
  const session = await getAuthSession();

  const category = await db.subscription.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      category: true,
    },
  });

  const comments = await db.comment.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      post: true,
      author: true,
    },
  });

  return (
    <>
      {/* <h1 className="font-bold text-3xl md:text-4xl">Лента</h1> */}
      <div className="grid sm:grid-cols-1 md:gap-x-4 md:grid-cols-5 xl:grid-cols-7 py-6">
        {session ? (
          <div className="hidden w-full min-w-100 md:block col-auto">
            <LeftButton />
            <hr className="mb-4" />
            {session ? <SideCategoryBlock category={category} /> : ''}
          </div>
        ) : (
          ''
        )}

        {session ? (
          <ul className="flex flex-col md:col-span-4 xl:col-span-4 space-y-6">
            {/* @ts-expect-error server component */}
            <CustomFeed />
          </ul>
        ) : (
          <ul className="flex flex-col md:col-span-5 xl:col-span-5 space-y-6">
            <ul className="flex jas gap-4">
              <li className="mb-1 mr-1 ">
                <Link
                  href={'/javascript'}
                  className={buttonVariants({
                    variant: 'subtle',
                  })}
                >
                  <div className="mr-2">
                    <Menu />
                  </div>
                  <div className="text-xl"> JavaScript </div>
                </Link>
              </li>
              <li className="mb-1 mr-1">
                <Link
                  href={'/cat/python'}
                  className={buttonVariants({
                    variant: 'subtle',
                  })}
                >
                  <div className="mr-2">
                    <Menu />
                  </div>
                  <div className="text-xl"> Python </div>
                </Link>
              </li>
              <li className="mb-1 mr-1">
                <Link
                  href={'/cat/react'}
                  className={buttonVariants({
                    variant: 'subtle',
                  })}
                >
                  <div className="mr-2">
                    <Menu />
                  </div>
                  <div className="text-xl"> React </div>
                </Link>
              </li>
              <li className="mb-1 mr-1">
                <Link
                  href={'/cat/tailwind'}
                  className={buttonVariants({
                    variant: 'subtle',
                  })}
                >
                  <div className="mr-2">
                    <Menu />
                  </div>
                  <div className="text-xl"> Tailwind</div>
                </Link>
              </li>
            </ul>

            {/* @ts-expect-error server component */}
            <GeneralFeed />
          </ul>
        )}

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
