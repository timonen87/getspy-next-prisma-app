import { db } from '@/lib/db';
import SideCategoryBlock from '../SideCategorysBlock';
import { getAuthSession } from '@/lib/auth';

const CategoryFeed = async () => {
  const session = await getAuthSession();
  const category = await db.subscription.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      category: true,
    },
  });

  return <SideCategoryBlock category={category} />;
};

export default CategoryFeed;
