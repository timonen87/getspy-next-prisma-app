'use client';

import Link from 'next/link';
import { Group, Keyboard } from 'lucide-react';
import { UserCategoryBlock } from '@/types/db';
import { FC } from 'react';
import UserAvatar from './UserAvatar ';
import { formatTimeToNow } from '@/lib/utils';
import { buttonVariants } from './ui/Button';

interface SideCategoryBlockProps {
  category: UserCategoryBlock[];
}

const SideCategoryBlock: FC<SideCategoryBlockProps> = ({ category }) => {
  return (
    <>
      <div className="hidden col-span-1 md:block w-[200px]">
        <ul className="flex-col justify-start gap-4">
          {category.map((obj) => (
            <li className="pb-1 mb-1" key={obj.id}>
              <Link
                href={`/cat/${obj.category.name}`}
                className={buttonVariants({
                  variant: 'ghost_full',
                })}
              >
                <Keyboard className="mr-2 h-4 w-4" />
                <div className="text-sm"> {obj.category.name} </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SideCategoryBlock;
