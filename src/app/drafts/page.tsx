import { getAuthSession } from '@/lib/auth';

import Link from 'next/link';
import { buttonVariants } from '@/components/ui/Button';
import { Menu } from 'lucide-react';
import CustomDraftsFeed from '@/components/home/CustomDraftsFeed';

export default async function Drafts() {
  const session = await getAuthSession();

  return (
    <>
      {/* <h1 className="font-bold text-3xl md:text-4xl">Лента</h1> */}
      <h1 className="font-bold text-3xl md:text-3xl h-14 w-full mt-5">
        {session ? `Черновики пользователя:  ${session?.user.name}` : ''}
      </h1>
      <div className="grid sm:grid-cols-1 md:gap-x-4  xl:grid-cols-7 py-6">
        <ul className="flex flex-col md:col-span-4 xl:col-span-7 space-y-6">
          {/* @ts-expect-error server component */}
          {session ? <CustomDraftsFeed /> : ''}
        </ul>

        <div className=" hidden flex-col gap-4 xl:block col-span-2"></div>
      </div>
    </>
  );
}
