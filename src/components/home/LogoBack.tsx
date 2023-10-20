'use client';

import { ChevronLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { Icons } from '../Icons';

const LogoBack = () => {
  const pathname = usePathname();

  // if path is /r/mycom, turn into /
  // if path is /r/mycom/post/cligad6jf0003uhest4qqkeco, turn into /r/mycom

  const categoryPath = getCategoryPath(pathname);

  return (
    <a href={categoryPath}>
      <Icons.logo className="w-28" />
    </a>
  );
};

const getCategoryPath = (pathname: string) => {
  const splitPath = pathname.split('/');

  if (splitPath.length > 1) return '/';
};

export default LogoBack;
