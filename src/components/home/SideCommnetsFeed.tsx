import { db } from '@/lib/db';

import { getAuthSession } from '@/lib/auth';

import SideCommnetsItem from '../SideCommenItem';

const SideCommnetsFeed = async () => {
  const session = await getAuthSession();
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

  return <SideCommnetsItem comments={comments} />;
};

export default SideCommnetsFeed;
