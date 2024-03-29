'use client';

import { Menu, MenuSquare, Home, Group, FileTextIcon } from 'lucide-react';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { buttonVariants } from './ui/Button';
import { buttonVariantsLink } from './ui/ButtonMenu';

const menu = [
  // { text: ' Главная', icon: <Home />, path: '/' },
  { text: ' Моя лента', icon: <Group />, path: '/' },
  { text: 'Все', icon: <FileTextIcon />, path: '/all' },
  // { text: 'Закладки', icon: <BookMarked />, path: '/bookmarks' },
  // { text: 'Подписки', icon: <ArrowDownUp />, path: '/follows' },
];

const LeftButton = () => {
  const pathname = usePathname();

  return (
    <>
      <div className="hidden col-auto md:block w-[150px]">
        <ul className="flex-col justify-start gap-4 mb-2">
          {menu.map((obj) => (
            <li className="mb-1 pb-2 justify-start" key={obj.path}>
              {/* <Link className={buttonVariants({variant:{router.asPath === obj.path ? 'subtle' : 'text'}})}></Link> */}

              <Link
                href={obj.path}
                className={buttonVariantsLink({
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
