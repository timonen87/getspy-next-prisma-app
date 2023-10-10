import Link from 'next/link';
import { Icons } from './Icons';
import { buttonVariants } from './ui/Button';
import { cn } from '@/lib/utils';
import { getAuthSession } from '@/lib/auth';
import UserAccountNav from './UserAccountNav';
import DropdownMenuButton from './DropdownMenuButton';
import SearchBar from './SearchBar';
import SheetNavMobile from './SheetNavMobile';

const Navbar = async () => {
  const session = await getAuthSession();

  return (
    <div className="fixed top-0 inset-x-0 bg-white border-b border-zinc-300 z-[10] py-2">
      <div className="container  max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        <div className="flex gap-2 items-center">
          <div className="block md:hidden">
            {/* <DropdownMenuButton /> */}
            <SheetNavMobile />
          </div>
          <Link href="/" className="flex gap-4 items-center">
            <Icons.logo className="w-28" />
          </Link>
          <div className="hidden md:block w-[400px]">
            <SearchBar />
          </div>
        </div>

        {session?.user ? (
          <UserAccountNav user={session.user} />
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/sign-in"
              className={cn(buttonVariants({ variant: 'ghost' }))}
            >
              Войти
            </Link>
            <Link href="/sign-up" className={buttonVariants()}>
              Регистрация
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
