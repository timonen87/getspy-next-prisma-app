import LeftButton from '@/components/LeftButton';
import CustomFeed from '@/components/home/CustomFeed';
import GeneralFeed from '@/components/home/GeneralFeed';
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config';

import { getAuthSession } from '@/lib/auth';

import { db } from '@/lib/db';
import SideCommnetsItem from '@/components/SideCommenItem';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/Button';
import SidePostFeed from '@/components/SidePostFeed';
import SideCategoryItem from '@/components/SideCategoryItem';
import SideCategoryMain from '@/components/home/sideCategory';
import SideCategoryBlock from '@/components/SideCategorysBlock';
import PostFeed from '@/components/PostFeed';

export default async function Home() {
  const session = await getAuthSession();
  const sidePosts = await db.post.findMany({
    where: {
      category: {
        hideBlock: true,
      },
    },
    include: {
      comments: true,
      category: true,
    },
    take: 7,
  });

  const sideCategory = await db.subscription.findMany({
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
      post: {
        include: {
          category: true,
        },
      },
      author: true,
    },
  });

  const posts = await db.post.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      votes: true,
      author: true,
      comments: true,
      category: true,
    },
    take: INFINITE_SCROLLING_PAGINATION_RESULTS,
  });

  return (
    <>
      {/* <h1 className="font-bold text-3xl md:text-4xl">Лента</h1> */}
      <div className="grid sm:grid-cols-1 md:gap-x-4 md:grid-cols-5 xl:grid-cols-7 py-6">
        {session ? (
          <div className="hidden col-auto max-w-200 md:block">
            <LeftButton />
            <hr className="mb-4" />

            <SideCategoryBlock category={sideCategory} />
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
            <SideCategoryMain sideCategory={sideCategory} />
            {/* @ts-expect-error server component */}
            <GeneralFeed />
          </ul>
        )}

        {/* subreddit info */}
        <div className=" hidden flex-col gap-4 xl:block col-span-2">
          <div className=" mb-4">
            <SidePostFeed sidePosts={sidePosts} />
            {comments.length > 0 ? (
              <SideCommnetsItem comments={comments} />
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </>
  );
}
