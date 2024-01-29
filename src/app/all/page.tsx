import LeftButton from '@/components/LeftButton';
import PostFeed from '@/components/PostFeed';

import SideCategoryBlock from '@/components/SideCategorysBlock';
import SideCommnetsItem from '@/components/SideCommenItem';
import ToFeedButton from '@/components/ToFeedButton';
import GeneralFeed from '@/components/home/GeneralFeed';

import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config';
import { getAuthSession } from '@/lib/auth';

import { db } from '@/lib/db';
import { notFound } from 'next/navigation';

const page = async () => {
  return (
    <>
      <div className="grid sm:grid-cols-1 md:gap-x-4 md:grid-cols-5  py-6">
        <div className="hidden w-full min-w-100 md:block col-auto">
          <LeftButton />
          <hr className="mb-4" />
        </div>
        <ul className="flex flex-col md:col-span-4 xl:col-span-4 space-y-6">
          <div className="flex justify-between ">
            <h1 className="font-bold text-3xl md:text-4xl h-14">Все статьи</h1>
            <ToFeedButton />
          </div>

          {/* @ts-expect-error server component */}

          <GeneralFeed />
        </ul>

        {/* subreddit info */}
        <div className=" hidden flex-col gap-4 xl:block col-span-2">
          <div className=" mb-4">
            {/* <SideCommnetsItem comments={comments} /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
