'use client';

import Link from 'next/link';
import { Users } from 'lucide-react';
import { ExtendedCommnets } from '@/types/db';
import { FC } from 'react';
import UserAvatar from './UserAvatar ';
import { formatTimeToNow } from '@/lib/utils';

interface SideCommnetsItemProps {
  comments: ExtendedCommnets[];
}

const SideCommnetsItem: FC<SideCommnetsItemProps> = ({ comments }) => {
  return (
    <div className="overflow-hidden h-fit rounded-lg border border-gray-200 gap-2 ">
      <div className="px-3 py-2 bg-slate-50">
        <p className="font-semibold py-3 px-3 flex items-center gap-2">
          <Users className="h-6 w-6 " />
          Это обсуждают
        </p>
      </div>
      <dl className="divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white">
        {/* <CommentItem  post={post} /> */}
        {comments.map((obj) => (
          <div className="flex flex-col gap-x-4 py-3" key={obj.id}>
            <div className="flex items-center">
              <UserAvatar
                user={{
                  name: obj.author.name || null,
                  image: obj.author.image || null,
                }}
                className="h-6 w-6"
              />
              <div className="ml-2 flex items-center gap-x-2">
                <p className="text-sm font-medium text-gray-900">
                  {obj.author.username}
                </p>

                <p className="max-h-40 truncate text-xs text-zinc-500">
                  {formatTimeToNow(new Date(obj.createdAt))}
                </p>
              </div>
            </div>
            <p className="text-sm text-zinc-900 mt-2">
              <Link href={`/cat/${obj.post.categoryId}/${obj.postId}`}>
                {obj.text}{' '}
              </Link>
            </p>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default SideCommnetsItem;
