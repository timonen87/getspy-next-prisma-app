'use client';
import {
  Cloud,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  UserPlus,
  Users,
  Home,
  Group,
  FileTextIcon,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Icons } from './Icons';
import { ActivityLogIcon, TokensIcon } from '@radix-ui/react-icons';
import { FC } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { UserCategoryBlock } from '@/types/db';

interface DropdownMenuButtonProps {
  sideMenuCategory: UserCategoryBlock[];
}

const DropdownMenuButton: FC<DropdownMenuButtonProps> = ({
  sideMenuCategory,
}: DropdownMenuButtonProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* <Button variant="outline">Профиль</Button> */}
        <button className="flex cursor-pointer bg-slate-100 rounded hover:bg-slate-200 p-1">
          <Icons.burger />
          {/* <Home className="p-1 h-7 w-7" />
          <ChevronDown className="p-1 h-7 w-7" /> */}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 ml-2">
        {/* <DropdownMenuLabel>Главная</DropdownMenuLabel> */}
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Home className="mr-2 h-4 w-4" />
            <Link href="/">Главная</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <TokensIcon className="mr-2 h-4 w-4" />
            <Link href="/">Моя лента</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ActivityLogIcon className="mr-2 h-4 w-4" />
            <Link href="/all">Все</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        {/* <DropdownMenuLabel>Категории</DropdownMenuLabel> */}
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <ul className="flex-col gap-2">
            {sideMenuCategory &&
              sideMenuCategory
                .map((category) => (
                  <DropdownMenuItem key={category.categoryId}>
                    <Link href={`/cat/${category.slug}`} className="flex gap-2">
                      {/* <Group className="mr-2 h-4 w-4" /> */}#
                      <div className="text-sm"> {category.name} </div>
                    </Link>
                  </DropdownMenuItem>
                ))
                .slice(0, 4)}
          </ul>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenuButton;
