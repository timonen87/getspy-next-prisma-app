'use client';
import { FC, useRef } from 'react';
import UserAvatar from './UserAvatar ';
import { Post, User, Vote } from '@prisma/client';
import { formatTimeToNow } from '@/lib/utils';
import EditorOutput from './EditorOutput';
import Link from 'next/link';
import { Divide, MessageSquare, Newspaper } from 'lucide-react';
import PostVoteClient from './post-vote/PostVoteClient';
import DraftPostNav from './DraftPostNav';

type PartialVote = Pick<Vote, 'type'>;

interface PostProps {
  categoryName: string;
  categorySlug: string;
  post: Post & {
    author: User;
    votes: Vote[];
  };
  commentAmt: number;
  votesAmt: number;
  currentVote?: PartialVote;
}

const Post: FC<PostProps> = ({
  post,
  commentAmt,
  categorySlug,
  categoryName,
  votesAmt: _votesAmt,
  currentVote: _currentVote,
}) => {
  const pRef = useRef<HTMLParagraphElement>(null);

  return (
    <div>
      <div className="rounded-md bg-white shadow">
        <div className="px-6 py-4 flex justify-between">
          {' '}
          <PostVoteClient
            postId={post.id}
            initialVote={_currentVote?.type}
            initialVotesAmt={_votesAmt}
          />
          <div className="w-0 flex-1">
            <div className="flex items-center justify-between">
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
              <div>
                {post.published == false ? (
                  <div className="text-3xl font-bold cursor-pointer">
                    <DraftPostNav postId={post.id} />
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>

            <div className="max-h-40 mt-1 text-xs text-gray-500"></div>

            <a href={`/cat/${categorySlug}/${post.slug}`}>
              <h2 className="sm: text-xl md:text-2xl font-semibold py-2 leading-6 text-gray-900">
                {post.title}
              </h2>
            </a>
            <div
              className="relative text-sm max-h-40 w-full overflow-clip"
              ref={pRef}
            >
              <EditorOutput content={post.content} />
              {pRef.current?.clientHeight === 160 ? (
                // blur bottom if content is too long
                <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent"></div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between bg-gray-50 z-20 text-sm ">
          <Link
            href={`/cat/${categorySlug}/${post.slug}`}
            className="w-fit flex items-center gap-2 pl-8"
          >
            <MessageSquare className="h-4 w-4 " /> {commentAmt}
          </Link>

          <div className="flex items-center gap-2 py-4">
            <Newspaper className="h-4 w-4 mr-1" />
            {categorySlug ? (
              <>
                <Link
                  className="underline text-zinc-900 text-sm underline-offset-2"
                  href={`/cat/${categorySlug}`}
                >
                  {categoryName}
                </Link>
                <span className="px-1"></span>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
