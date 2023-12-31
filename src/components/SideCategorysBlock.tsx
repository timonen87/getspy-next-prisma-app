'use client';

import Link from 'next/link';
import { Group, Keyboard, Menu, MenuSquare } from 'lucide-react';
import { UserCategoryBlock } from '@/types/db';
import { FC } from 'react';

import { buttonVariants } from './ui/Button';
import { Icons } from './Icons';
import { buttonVariantsLink } from './ui/ButtonMenu';

interface SideCategoryBlockProps {
  category: UserCategoryBlock[];
}

const SideCategoryBlock: FC<SideCategoryBlockProps> = ({ category }) => {
  return (
    <>
      <div className="hidden col-span-1 md:block w-[200px]">
        <ul className="flex-col justify-start gap-4">
          {category &&
            category.map((obj) => (
              <li className="pb-1" key={obj.id}>
                <Link
                  href={`/cat/${obj.category.slug}`}
                  className={buttonVariantsLink({
                    variant: 'subtle',
                  })}
                >
                  {/* <Icons.main className="w-6 h-6 mr-2 ml-2" /> */}#
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
