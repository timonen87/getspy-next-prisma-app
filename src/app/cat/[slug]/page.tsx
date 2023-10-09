import MiniCreatePost from '@/components/MiniCreatePost';
import PostFeed from '@/components/PostFeed';

import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config';

import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import { FC } from 'react';

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
      <h1 className="font-bold text-3xl md:text-4xl h-14">{category.slug}</h1>

      <MiniCreatePost session={session} />

      <PostFeed initialPosts={category.posts} categoryName={category.name} />
    </>
  );
};

export default page;
