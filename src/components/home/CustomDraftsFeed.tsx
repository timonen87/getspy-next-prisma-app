import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config';
import DraftFeed from '../DraftFeed';

const CustomDraftsFeed = async () => {
  const session = await getAuthSession();

  if (!session) return notFound();

  const followedCommunities = await db.subscription.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      category: true,
    },
  });

  const postsDrafts = await db.post.findMany({
    where: {
      published: false,
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

  return <DraftFeed initialPosts={postsDrafts} />;
};

export default CustomDraftsFeed;
