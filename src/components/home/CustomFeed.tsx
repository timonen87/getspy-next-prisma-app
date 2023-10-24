import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import PostFeed from '../PostFeed';
import { notFound } from 'next/navigation';
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config';

const CustomFeed = async () => {
  const session = await getAuthSession();

  // only rendered if session exists, so this will not happen
  if (!session) return notFound();

  const followedCommunities = await db.subscription.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      category: true,
    },
  });

  const posts = await db.post.findMany({
    where: {
      published: true,
      category: {
        id: {
          in: followedCommunities.map((sub) => sub.category.id),
        },
      },
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

  return <PostFeed initialPosts={posts} />;
};

export default CustomFeed;
