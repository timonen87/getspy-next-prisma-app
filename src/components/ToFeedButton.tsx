'use client';

import { ChevronLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { buttonVariants } from './ui/Button';

const ToFeedButton = () => {
  const pathname = usePathname();

  // if path is /r/mycom, turn into /
  // if path is /r/mycom/post/cligad6jf0003uhest4qqkeco, turn into /r/mycom

  const categoryPath = getCategoryPath(pathname);

  return (
    <a href={categoryPath} className={buttonVariants({ variant: 'ghost' })}>
      <ChevronLeft className="h-4 w-4 mr-1" />
      {categoryPath === '/' ? 'Назад на главную' : 'Назад в ленту'}
    </a>
  );
};

const getCategoryPath = (pathname: string) => {
  const splitPath = pathname.split('/');

  if (splitPath.length === 3) return '/';
  else if (splitPath.length > 3) return `/${splitPath[1]}/${splitPath[2]}`;
  // default path, in case pathname does not match expected format
  else return '/';
};

export default ToFeedButton;
