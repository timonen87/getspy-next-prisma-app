'use client';

import {
  ChevronLeft,
  BookMarked,
  Menu,
  MenuSquare,
  ArrowDownUp,
} from 'lucide-react';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { buttonVariants } from './ui/Button';

const menu = [
  { text: ' Моя лента', icon: <Menu />, path: '/' },
  { text: 'Все', icon: <MenuSquare />, path: '/all' },
  // { text: 'Закладки', icon: <BookMarked />, path: '/bookmarks' },
  // { text: 'Подписки', icon: <ArrowDownUp />, path: '/follows' },
];

const LeftButton = () => {
  const pathname = usePathname();

  return (
    <>
      <div className="hidden col-span-1 md:block w-[200px]">
        <ul className="flex-col justify-start gap-4 mb-2">
          {menu.map((obj) => (
            <li className="mb-1 pb-2" key={obj.path}>
              {/* <Link className={buttonVariants({variant:{router.asPath === obj.path ? 'subtle' : 'text'}})}></Link> */}

              <Link
                href={obj.path}
                className={buttonVariants({
                  variant: pathname == obj.path ? 'subtle' : 'ghost',
                })}
              >
                <div className="mr-2">{obj.icon}</div>
                <div className="text-sm"> {obj.text} </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default LeftButton;
