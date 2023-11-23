import Link from 'next/link';
import { Icons } from './Icons';
import { buttonVariants } from './ui/Button';
import { cn } from '@/lib/utils';
import { getAuthSession } from '@/lib/auth';
import UserAccountNav from './UserAccountNav';
import DropdownMenuButton from './DropdownMenuButton';
import SearchBar from './SearchBar';
import SheetNavMobile from './SheetNavMobile';
import LogoBack from './home/LogoBack';
import UserAccountNavUser from './UserAccountNavUser';

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
          <LogoBack />
          <div className="hidden md:block w-[400px]">
            <SearchBar />
          </div>
        </div>
        {session?.user.role == 'admin' && (
          <UserAccountNav user={session.user} />
        )}
        {session?.user.role == 'user' && (
          <UserAccountNavUser user={session.user} />
        )}
        {!session && (
          <div className="flex items-center gap-2">
            <Link
              href="/sign-in"
              className={cn(buttonVariants({ variant: 'ghost' }))}
            >
              Войти
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
