import { db } from '@/lib/db';
import PostFeed from '../PostFeed';
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config';

const GeneralFeed = async () => {
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

  return <PostFeed initialPosts={posts} />;
};

export default GeneralFeed;
