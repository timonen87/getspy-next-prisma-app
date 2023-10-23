'use client';
import { buttonVariants } from './ui/Button';
import Link from 'next/link';
import { Group } from 'lucide-react';
import { ExtendedCategory } from '@/types/db';
import { FC } from 'react';

interface SideCategoryItemProps {
  category: ExtendedCategory[];
}

const SideCategoryItem: FC<SideCategoryItemProps> = ({ category }) => {
  return (
    <dl className="divide-y px-6  text-sm leading-6 ">
      {category.map((obj) => (
        <div className="flex flex-col gap-x-1" key={obj.id}>
          <dt className="text-m flex items-center gap-1">
            <Link
              href={`/cat/${obj.slug}`}
              className={buttonVariants({
                variant: 'ghost',
              })}
            >
              <Group className="mr-1 h-5 w-5" />
              {obj.name}
            </Link>
          </dt>
        </div>
      ))}
    </dl>
  );
};

export default SideCategoryItem;
