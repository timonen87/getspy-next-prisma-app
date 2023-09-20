import Link from 'next/link';
import { Icons } from './Icons';
import { buttonVariants } from './ui/Button';
import { cn } from '@/lib/utils';
import { getAuthSession } from '@/lib/auth';
import UserAccountNav from './UserAccountNav';
import DropdownMenuButton from './DropdownMenuButton';
import NavBurger from './sidebar/NavBurger';

const Navbar = async () => {
  const session = await getAuthSession();

  return (
    // <header className=" sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur">
    <div className="fixed top-0 inset-x-0 bg-white border-b border-zinc-300 z-[10] py-2">
      <div className="container  max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        <div className="flex gap-2 items-center">
          <div>
            {/* <NavBurger /> */}
            <DropdownMenuButton />
          </div>
          <Link href="/" className="flex gap-2 items-center">
            <Icons.logo className="h-12 w-24" />
          </Link>

          <div className="hidden md:block">{/* <SearchBar /> */}</div>
        </div>
        {/* <DropdownMenuButton /> */}
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
    // </header>
  );
};

export default Navbar;
