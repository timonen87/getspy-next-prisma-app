import LeftButton from '@/components/LeftButton';
import CustomFeed from '@/components/home/CustomFeed';
import GeneralFeed from '@/components/home/GeneralFeed';

import { getAuthSession } from '@/lib/auth';

import SideCategoryBlock from '@/components/SideCategorysBlock';
import { db } from '@/lib/db';
import SideCommnetsItem from '@/components/SideCommenItem';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/Button';
import SidePostFeed from '@/components/SidePostFeed';

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

  return (
    <>
      {/* <h1 className="font-bold text-3xl md:text-4xl">Лента</h1> */}
      <div className="grid sm:grid-cols-1 md:gap-x-4 md:grid-cols-5 xl:grid-cols-7 py-6">
        {session ? (
          <div className="hidden col-auto max-w-200 md:block">
            <LeftButton />
            <hr className="mb-4" />

            {session ? <SideCategoryBlock category={sideCategory} /> : ''}
          </div>
        ) : (
          ''
        )}

        {session ? (
          <ul className="flex flex-col md:col-span-4 xl:col-span-4 space-y-6">
            {/* @ts-expect-error server component */}

            {session ? <CustomFeed /> : <GeneralFeed />}
          </ul>
        ) : (
          <ul className="flex flex-col md:col-span-5 xl:col-span-5 space-y-6">
            <div>
              <ul className="flex gap-2">
                {sideCategory
                  .map((obj) => (
                    <li className="pb-1 " key={obj.categoryId}>
                      <Link
                        href={`/cat/${obj.category.slug}`}
                        className={buttonVariants({
                          variant: 'subtle',
                        })}
                      >
                        {/* <Icons.main className="w-6 h-6 mr-2 ml-2" /> */}@
                        <div className="text-sm"> {obj.category.name} </div>
                      </Link>
                    </li>
                  ))
                  .slice(0, 7)}
              </ul>
            </div>
            {/* @ts-expect-error server component */}
            <GeneralFeed />
          </ul>
        )}

        {/* subreddit info */}
        <div className=" hidden flex-col gap-4 xl:block col-span-2">
          <div className=" mb-4">
            <SidePostFeed sidePosts={sidePosts} />
            <SideCommnetsItem comments={comments} />
          </div>
        </div>
      </div>
    </>
  );
}
