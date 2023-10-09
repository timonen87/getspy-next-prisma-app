import LeftButton from '@/components/LeftButton';
import PostFeed from '@/components/PostFeed';
import SideCategoryBlock from '@/components/SideCategorysBlock';
import SideCommnetsItem from '@/components/SideCommenItem';
import GeneralFeed from '@/components/home/GeneralFeed';

import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config';
import { getAuthSession } from '@/lib/auth';

import { db } from '@/lib/db';
import { notFound } from 'next/navigation';

const page = async () => {
  const session = await getAuthSession();
  const posts = await db.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      votes: true,
      author: true,
      comments: true,
      category: true,
    },
    take: INFINITE_SCROLLING_PAGINATION_RESULTS, // 4 to demonstrate infinite scroll, should be higher in production
  });

  if (!posts) return notFound;

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

  const category = await db.subscription.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      category: true,
    },
  });

  return (
    <>
      {/* <h1 className="font-bold text-3xl md:text-4xl">Лента</h1> */}
      <div className="grid sm:grid-cols-1 md:gap-x-4 md:grid-cols-5 xl:grid-cols-7 py-6">
        <div className="hidden w-full min-w-100 md:block col-auto">
          <LeftButton />
          <hr className="mb-4" />
          {session ? <SideCategoryBlock category={category} /> : ''}
        </div>
        <ul className="flex flex-col md:col-span-4 xl:col-span-4 space-y-6">
          <h1 className="font-bold text-3xl md:text-4xl h-14">Все статьи</h1>

          <GeneralFeed />
        </ul>

        {/* subreddit info */}
        <div className=" hidden flex-col gap-4 xl:block col-span-2">
          <div className=" mb-4">
            <SideCommnetsItem comments={comments} />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
