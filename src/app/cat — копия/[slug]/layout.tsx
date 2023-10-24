import SubscribeLeaveToggle from '@/components/SubscribeLeaveToggle';
import { buttonVariants } from '@/components/ui/Button';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { format } from 'date-fns';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const layout = async ({
  children,
  params: { slug },
}: {
  children: React.ReactNode;
  params: { slug: string };
}) => {
  const session = await getAuthSession();
  const category = await db.category.findFirst({
    where: { slug: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
        },
      },
    },
  });

  const subscription = !session?.user
    ? undefined
    : await db.subscription.findFirst({
        where: {
          category: {
            slug: slug,
          },
          user: {
            id: session.user.id,
          },
        },
      });

  const isSubcribed = !!subscription;

  if (!category) return notFound();

  const memberCount = await db.subscription.count({
    where: {
      category: {
        slug: slug,
      },
    },
  });

  return (
    <div className="container max-w-7xl mx-auto h-full pt-4">
      <div>
        {/* Кнопка НАЗАД */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-y-4 xl:gap-x-4">
          <ul className="flex flex-col col-span-3 space-y-6">{children}</ul>
          {/* Правый блок */}
          <div className="ml-0 md:ml-16 xl:ml-0">
            <div className=" h-fit rounded-lg border border-gray-200 order-first md:order-last ">
              <div className="px-6 py-4">
                <p className="text-2xl font-semibold py-3">{category.name} </p>
              </div>

              <dl className="divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white">
                <div className="flex justify-between gap-4 py-3">
                  <p>{category.description}</p>
                </div>
                <div className="flex justify-between gap-x-4 py-3">
                  <dt className="text-gray-500">Подписчиков</dt>
                  <dd className="flex items-start gap-x-2">
                    <div className="text-gray-900">{memberCount}</div>
                  </dd>
                </div>

                {category.creatorId === session?.user?.id ? (
                  <div className="flex justify-between gap-x-4 py-3">
                    <dt className="text-gray-500">
                      Вы создали данную категорию
                    </dt>
                  </div>
                ) : null}
                {category.creatorId !== session?.user?.id ? (
                  <SubscribeLeaveToggle
                    isSubcribed={isSubcribed}
                    categoryName={category.slug}
                    categoryId={category.id}
                  />
                ) : null}
                <Link
                  className={buttonVariants({
                    variant: 'outline',
                    className: 'w-full mb-6',
                  })}
                  href={`/cat/${slug}/submit`}
                >
                  Создать пост
                </Link>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default layout;
