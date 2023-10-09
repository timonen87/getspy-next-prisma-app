'use client';

import Link from 'next/link';

import { SideExtendedPost } from '@/types/db';
import { FC } from 'react';
import { MessageSquare, Newspaper, Users } from 'lucide-react';

interface SidePostFeedProps {
  sidePosts: SideExtendedPost[];
}

const SidePostFeed: FC<SidePostFeedProps> = ({ sidePosts }) => {
  return (
    <div className="overflow-hidden h-fit rounded-lg border border-gray-200 gap-2 mb-4">
      <div className="px-3 py-2 bg-slate-50">
        <p className="font-semibold py-3 px-3 flex items-center gap-2">
          <Newspaper className="h-6 w-6 " />
          Сейчас читают
        </p>
      </div>
      <dl className="divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white">
        {/* <CommentItem  post={post} /> */}
        {sidePosts.map((obj) => (
          <div className="flex flex-col gap-x-4 py-3" key={obj.id}>
            <Link href={`/cat/${obj.category.name}/post/${obj.id}`}>
              <div className="flex items-center">
                <div className="flex items-center gap-x-2">
                  <p className="text-sm font-medium text-gray-900">
                    {obj.title}
                  </p>
                </div>
              </div>
              <p className="flex items-center z-20 text-sm mr-2">
                <MessageSquare className="h-4 w-4 " />
                <span className="ml-2"> {obj.comments.length}</span>
              </p>
            </Link>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default SidePostFeed;
