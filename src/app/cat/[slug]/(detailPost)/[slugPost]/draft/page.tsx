import CommentsSection from '@/components/CommentsSection';
import EditorOutput from '@/components/EditorOutput';
import PostVoteServer from '@/components/post-vote/PostVoteServer';
import { Button, buttonVariants } from '@/components/ui/Button';
import { db } from '@/lib/db';
import { redis } from '@/lib/redis';
import { formatTimeToNow } from '@/lib/utils';
import { CachedPost } from '@/types/redis';
import { Post, User, Vote } from '@prisma/client';

import { ArrowBigDown, ArrowBigUp, Loader2 } from 'lucide-react';
import { notFound, usePathname } from 'next/navigation';
import { Suspense } from 'react';
import UserAvatar from '@/components/UserAvatar ';
import Link from 'next/link';
import DraftPostNav from '@/components/DraftPostNav';
import { getAuthSession } from '@/lib/auth';

interface CategoryPostPageProps {
  params: {
    slugPost: string;
    slug: string;
    published: boolean;
  };
}

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const CategorPostPage = async ({ params }: CategoryPostPageProps) => {
  const session = await getAuthSession();

  const cachedPost = (await redis.hgetall(
    `post:${params.slugPost}`
  )) as CachedPost;

  let post: (Post & { votes: Vote[]; author: User }) | null = null;

  if (!cachedPost) {
    post = await db.post.findFirst({
      where: {
        slug: params.slugPost,
        published: false,
      },
      include: {
        votes: true,
        author: true,
      },
    });
  }

  if (!post && !cachedPost) return notFound();

  return (
    <div>
      <div className="h-full flex flex-row items-start justify-between ">
        <aside className=" hidden md:block fixed rounded-lg border border-gray-200 w-14">
          <Suspense fallback={<PostVoteShell />}>
            {/* @ts-expect-error server component */}
            <PostVoteServer
              postId={post?.id ?? cachedPost.id}
              getData={async () => {
                return await db.post.findUnique({
                  where: {
                    slug: params.slugPost,
                  },
                  include: {
                    votes: true,
                  },
                });
              }}
            />
          </Suspense>
        </aside>

        <div className="overflow-x-hidden lg:w-0 w-full flex-1 bg-white p-4 rounded-lg border border-gray-200 md:ml-16 ">
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center">
              <UserAvatar
                user={{
                  name:
                    post?.author.username ??
                    (cachedPost.authorUsername || null),
                  image: post?.author.image ?? (cachedPost.image || null),
                }}
                className="h-10 w-10"
              />
              <div className="flex flex-col items-start gap-0 ml-2">
                <span>
                  {post?.author.username ?? cachedPost.authorUsername}
                </span>{' '}
                <span className="text-xs">
                  {formatTimeToNow(
                    new Date(post?.createdAt ?? cachedPost.createdAt)
                  )}
                </span>
              </div>
            </div>
            <div className="flex items-center text-2xl">
              {session?.user.role == 'admin' ? (
                <DraftPostNav
                  postId={post?.id ?? cachedPost.id}
                  slugPost={post?.slug ?? cachedPost.slugPost}
                  slug={params.slug}
                  published={post?.published ?? cachedPost.published}
                />
              ) : (
                ''
              )}
            </div>
          </div>

          <h1 className="text-3xl font-semibold  py-2 text-gray-900">
            {post?.title ?? cachedPost.title}
          </h1>

          <EditorOutput content={post?.content ?? cachedPost.content} />
          <Suspense
            fallback={
              <Loader2 className="h-5 w-5 animate-spin text-zinc-500" />
            }
          >
            {/* @ts-expect-error Server Component */}
            <CommentsSection postId={post?.id ?? cachedPost.id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
function PostVoteShell() {
  return (
    <div className="flex items-center flex-col pr-6 w-20">
      {/* upvote */}
      <div className={buttonVariants({ variant: 'ghost' })}>
        <ArrowBigUp className="h-5 w-5 text-zinc-700" />
      </div>

      {/* score */}
      <div className="text-center py-2 font-medium text-sm text-zinc-900">
        <Loader2 className="h-3 w-3 animate-spin" />
      </div>

      {/* downvote */}
      <div className={buttonVariants({ variant: 'ghost' })}>
        <ArrowBigDown className="h-5 w-5 text-zinc-700" />
      </div>
    </div>
  );
}

export default CategorPostPage;