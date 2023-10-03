import { db } from '@/lib/db';
import { ExtendedCommentsCategory } from '@/types/db';
import { Group, HomeIcon } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FC } from 'react';

interface SideCategoryProps {
  Category: ExtendedCommentsCategory[];
  categoryName: string;
}

const SideCategory = async ({ categoryName }: SideCategoryProps) => {
  const category = await db.category.findMany({
    where: {
      name: categoryName,
    },
  });

  if (!category) return notFound();
  return (
    <>
      {/* <div className="px-3 bg-slate-50">
        <p className="font-semibold text-2xl px-3 flex items-center ">Каналы</p>
      </div> */}
      <dt className="text-sm flex items-center gap-0 ml-4 "></dt>
      <dl className="divide-y px-6  text-sm leading-6 ">
        {category.map((obj) => (
          <div className="flex flex-col gap-x-4 py-3" key={obj.id}>
            <dt className="text-sm flex items-center gap-0 ml-4 ">
              #<Link href={`/cat/${obj.name}`}>{obj.name}</Link>
            </dt>
          </div>
        ))}
      </dl>
    </>
  );
};

export default SideCategory;
