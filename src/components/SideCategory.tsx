import { db } from '@/lib/db';

import SideCategoryItem from './SideCategoryItem';

const SideCategory = async () => {
  const category = await db.category.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      posts: true,
    },
  });

  return <SideCategoryItem category={category} />;
};

export default SideCategory;
