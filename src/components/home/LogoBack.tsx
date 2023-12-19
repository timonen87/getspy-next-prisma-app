'use client';

import { ChevronLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { Icons } from '../Icons';

const LogoBack = () => {
  const pathname = usePathname();

  const categoryPath = getCategoryPath(pathname);

  return (
    <a href={categoryPath}>
      <Icons.logo className="w-20 md:w-28" />
    </a>
  );
};

const getCategoryPath = (pathname: string) => {
  const splitPath = pathname.split('/');

  if (splitPath.length > 1) return '/';
};

export default LogoBack;
