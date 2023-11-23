import MiniCreatePost from '@/components/MiniCreatePost';
import PostFeed from '@/components/PostFeed';
import ToFeedButton from '@/components/ToFeedButton';
import type { Metadata } from 'next';

import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config';

import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  try {
    const metaData = await db.category.findFirst({
      where: {
        slug: params.slug,
      },
    });
    if (!metaData)
      return {
        title: 'Not Found',
        description: 'not found',
      };
    return {
      title: `${metaData?.name} | Getspy.ru`,
      description: metaData?.name,
    };
  } catch (error) {
    return {
      title: 'Not Found',
      description: 'not found',
    };
  }
}

interface PageProps {
  params: {
    slug: string;
  };
}

const page = async ({ params }: PageProps) => {
  const { slug } = params;
  const session = await getAuthSession();

  const category = await db.category.findFirst({
    where: { slug: slug },
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
        <h1 className="font-bold text-3xl md:text-4xl h-14">{category.name}</h1>
        <ToFeedButton />
      </div>

      {session?.user.role == 'admin' ? (
        <MiniCreatePost session={session} />
      ) : (
        ''
      )}

      <PostFeed initialPosts={category.posts} categorySlug={category.slug} />
    </>
  );
};

export default page;
