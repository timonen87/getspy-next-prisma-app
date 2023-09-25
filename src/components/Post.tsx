'use client';
import { FC, useRef } from 'react';
import UserAvatar from './UserAvatar ';
import { Post, User, Vote } from '@prisma/client';
import { formatTimeToNow } from '@/lib/utils';
import EditorOutput from './EditorOutput';
import Link from 'next/link';
import { MessageSquare, Newspaper } from 'lucide-react';
import PostVoteClient from './post-vote/PostVoteClient';

type PartialVote = Pick<Vote, 'type'>;

interface PostProps {
  categoryName: string;
  post: Post & {
    author: User;
    votes: Vote[];
  };
  commentAmt: number;
  votesAmt: number;
  currenVote?: PartialVote;
}

const Post: FC<PostProps> = ({
  post,
  commentAmt,
  categoryName,
  votesAmt,
  currenVote,
}) => {
  const pRef = useRef<HTMLParagraphElement>(null);

  return (
    <div className="rounded-md bg-white shadow">
      <div className="px-6 py-4 flex justify-between">
        <PostVoteClient
          postId={post.id}
          initialVote={currenVote?.type}
          intitalVotesAmt={votesAmt}
        />
        <div className="w-0 flex-1">
          <div className="flex items-center gap-1">
            <UserAvatar
              user={{
                name: post.author.name || null,
                image: post.author.image || null,
              }}
              className="h-10 w-10"
            />
            <div className="flex flex-col items-start gap-0 ml-2">
              <span>{post.author.username}</span>{' '}
              <span className="text-xs">
                {formatTimeToNow(new Date(post.createdAt))}
              </span>
            </div>
          </div>
          <div className="max-h-40 mt-1 text-xs text-gray-500">
            {/* {categoryName ? (
              <>
                <a
                  className="underline text-zinc-900 text-sm underline-offset-2"
                  href={`/cat/${categoryName}`}
                >
                  @ {categoryName}
                </a>
                <span className="px-1">•</span>
              </>
            ) : null} */}
            {/* <span>{post.author.username}</span>{' '}
            {formatTimeToNow(new Date(post.createdAt))} */}
          </div>

          <a href={`/cat/${categoryName}/post/${post.id}`}>
            <h2 className="text-xl font-semibold py-2 leading-6 text-gray-900">
              {post.title}
            </h2>
          </a>
          <div
            className="relative text-sm max-h-40 w-full overflow-clip"
            ref={pRef}
          >
            <EditorOutput content={post.content} />
            {pRef.current?.clientHeight === 180 ? (
              // blur bottom if content is too long
              <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent"></div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between bg-gray-50 z-20 text-sm  sm:px-6">
        <div className="">
          <Link
            href={`/cat/${categoryName}/post/${post.id}`}
            className="w-fit flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4" /> {commentAmt} комментариев
          </Link>
        </div>
        <div className="flex items-center gap-2 py-4">
          <Newspaper className="h-4 w-4 mr-1" />
          {categoryName ? (
            <>
              <a
                className="underline text-zinc-900 text-sm underline-offset-2"
                href={`/cat/${categoryName}`}
              >
                {categoryName}
              </a>
              <span className="px-1"></span>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Post;