import CommentsSection from '@/components/CommentsSection';
import EditorOutput from '@/components/EditorOutput';
import PostVoteServer from '@/components/post-vote/PostVoteServer';
import { buttonVariants } from '@/components/ui/Button';
import { db } from '@/lib/db';
import { redis } from '@/lib/redis';
import { formatTimeToNow } from '@/lib/utils';
import { CachedPost } from '@/types/redis';
import { Post, User, Vote } from '@prisma/client';

import { ArrowBigDown, ArrowBigUp, Loader2 } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import UserAvatar from '@/components/UserAvatar ';

export async function generateMetadata({
  params,
}: {
  params: {
    slugPost: string;
  };
}) {
  try {
    const metaData = await db.post.findFirst({
      where: {
        slug: params.slugPost,
      },
    });
    if (!metaData)
      return {
        title: 'Not Found',
        description: 'not found',
      };
    return {
      title: metaData?.title,
      description: metaData?.title,
    };
  } catch (error) {
    console.log(error);
    return {
      title: 'Not Found',
      description: 'not found',
    };
  }
}

interface CategoryPostPageProps {
  params: {
    slugPost: string;
  };
}

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const CategorPostPage = async ({ params }: CategoryPostPageProps) => {
  const cachedPost = (await redis.hgetall(
    `post:${params.slugPost}`
  )) as CachedPost;

  let post: (Post & { votes: Vote[]; author: User }) | null = null;

  if (!cachedPost) {
    post = await db.post.findFirst({
      where: {
        slug: params.slugPost,
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
        <div className="ml-0 lg:w-0 w-full flex-1 bg-white p-4 rounded-lg border border-gray-200 md:ml-16">
          <div className="flex items-center gap-1">
            <UserAvatar
              user={{
                name:
                  post?.author.username ?? (cachedPost.authorUsername || null),
                image: post?.author.image ?? (cachedPost.image || null),
              }}
              className="h-10 w-10"
            />
            <div className="flex flex-col items-start gap-0 ml-2">
              <span>{post?.author.username ?? cachedPost.authorUsername}</span>{' '}
              <span className="text-xs">
                {formatTimeToNow(
                  new Date(post?.createdAt ?? cachedPost.createdAt)
                )}
              </span>
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
            <CommentsSection postId={post?.slug ?? cachedPost.slug} />
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
