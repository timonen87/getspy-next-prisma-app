import { db } from '@/lib/db';

import { Group, HomeIcon } from 'lucide-react';
import UserAvatar from './UserAvatar ';
import { formatTimeToNow } from '@/lib/utils';
import Link from 'next/link';

interface SideCommentsProps {
  postId: string;
}

const SideComments = async ({ postId }: SideCommentsProps) => {
  const comments = await db.comment.findMany({
    where: {
      postId: postId,
    },
    include: {
      post: true,
      author: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="overflow-hidden h-fit rounded-lg border border-gray-200 gap-2 ">
      <div className="px-3 py-2 bg-slate-50">
        <p className="font-semibold py-3 px-3 flex items-center gap-2">
          <Group className="h-6 w-6 " />
          Python
        </p>
      </div>
      <dl className="divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white">
        {/* <CommentItem  post={post} /> */}
        {comments.map((comment) => (
          <div className="flex flex-col gap-x-4 py-3" key={comment.id}>
            <div className="flex items-center">
              <UserAvatar
                user={{
                  name: comment.author.name || null,
                  image: comment.author.image || null,
                }}
                className="h-6 w-6"
              />
              <div className="ml-2 flex items-center gap-x-2">
                <p className="text-sm font-medium text-gray-900">
                  {comment.author.username}
                </p>

                <p className="max-h-40 truncate text-xs text-zinc-500">
                  {formatTimeToNow(new Date(comment.createdAt))}
                </p>
              </div>
            </div>
            <p className="text-sm text-zinc-900 mt-2">{comment.text}</p>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default SideComments;
