import { FC } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from './ui/Sheet';
import Link from 'next/link';
import { Button, buttonVariants } from './ui/Button';
import { Icons } from './Icons';
import {
  ArrowDownUp,
  FileTextIcon,
  Group,
  BookMarked,
  Home,
} from 'lucide-react';
import SearchBar from './SearchBar';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { buttonVariantsLink } from './ui/ButtonMenu';

interface SheetNavMobileProps {}

const menu = [
  //   { text: ' Главная', icon: <Home />, path: '/' },
  { text: ' Моя лента', icon: <Group />, path: '/' },
  { text: 'Все', icon: <FileTextIcon />, path: '/all' },
  //   { text: 'Закладки', icon: <BookMarked />, path: '/bookmarks' },
  //   { text: 'Подписки', icon: <ArrowDownUp />, path: '/follows' },
];

const SHEET_SIDES = ['left'] as const;

type SheetSide = (typeof SHEET_SIDES)[number];

const SheetNavMobile: FC<SheetNavMobileProps> = ({}) => {
  return (
    <div>
      <Sheet key={'left'}>
        <SheetTrigger asChild>
          <button className="flex cursor-pointer bg-slate-100 rounded hover:bg-slate-200 p-1">
            <Icons.burger />
          </button>
        </SheetTrigger>

        <SheetContent side={'left'} className="w-[300px] ">
          <div className="flex justify-between items-center mb-8">
            <Link href="/">
              <Icons.logo className="w-24 ml-5 absolute top-3" />
            </Link>
            <SheetClose asChild></SheetClose>
          </div>
          <div className="w-[250px] ml-2 mb-2">
            <SearchBar />
          </div>
          <SheetHeader>
            <SheetDescription>
              <div>
                <ul className="flex-col">
                  {menu.map((obj) => (
                    <li key={obj.path} className=" ml-0 justify-start mb-2">
                      <Link
                        href={obj.path}
                        className={buttonVariantsLink({
                          variant: 'ghost',
                        })}
                      >
                        <div className="mr-2">{obj.icon}</div>
                        <div className="text-sm"> {obj.text} </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <hr />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SheetNavMobile;
