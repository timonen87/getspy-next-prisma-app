import React from 'react';
import { FC } from 'react';
import { buttonVariants } from '../ui/Button';
import Link from 'next/link';

interface SideCategoryMainProps {
  sideCategory: any[];
}

const SideCategoryMain: FC<SideCategoryMainProps> = ({
  sideCategory,
}: SideCategoryMainProps) => {
  return (
    <ul className="flex gap-2">
      {sideCategory
        .map((obj) => (
          <li className="pb-1 " key={obj.categoryId}>
            <Link
              href={`/cat/${obj.category.slug}`}
              className={buttonVariants({
                variant: 'subtle',
              })}
            >
              {/* <Icons.main className="w-6 h-6 mr-2 ml-2" /> */}
              <div className="text-sm"> {obj.category.name} </div>
            </Link>
          </li>
        ))
        .slice(1, 4)}
    </ul>
  );
};

export default SideCategoryMain;
