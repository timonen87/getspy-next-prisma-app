import MiniCreatePost from '@/components/MiniCreatePost';
import PostFeed from '@/components/PostFeed';
import ToFeedButton from '@/components/ToFeedButton';

import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config';

import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    slug: string;
  };
}

const page = async ({ params }: PageProps) => {
  const { slug } = params;
  const session = await getAuthSession();

  const category = await db.category.findFirst({
    where: { name: slug },
    include: {
      posts: {
        where: {
          published: true,
        },
        include: {
          author: true,
          votes: true,
          comments: true,
          category: true,
        },
        take: INFINITE_SCROLLING_PAGINATION_RESULTS,
      },
    },
  });

  if (!category) return notFound;

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-3xl md:text-4xl h-14">{category.slug}</h1>
        <ToFeedButton />
      </div>

      <MiniCreatePost session={session} />

      <PostFeed initialPosts={category.posts} categoryName={category.name} />
    </>
  );
};

export default page;
