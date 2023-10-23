import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { z } from 'zod';

export async function GET(req: Request) {
  const url = new URL(req.url);

  const session = await getAuthSession();

  let followedCommunitiesIds: string[] = [];

  if (session) {
    const followedCommunities = await db.subscription.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        category: true,
      },
    });

    followedCommunitiesIds = followedCommunities.map((sub) => sub.category.id);
  }

  try {
    const { limit, page, categorySlug } = z
      .object({
        limit: z.string(),
        page: z.string(),
        categorySlug: z.string().nullish().optional(),
      })
      .parse({
        categorySlug: url.searchParams.get('categorySlug'),
        limit: url.searchParams.get('limit'),
        page: url.searchParams.get('page'),
      });

    let whereClause = {};

    if (categorySlug) {
      whereClause = {
        published: true,
        category: {
          slug: categorySlug,
        },
      };
    } else if (session) {
      whereClause = {
        published: true,
        category: {
          id: {
            in: followedCommunitiesIds,
          },
        },
      };
    }

    const posts = await db.post.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: true,
        votes: true,
        author: true,
        comments: true,
      },
      where: whereClause,
    });

    return new Response(JSON.stringify(posts));
  } catch (error) {
    return new Response('Не удалось получить посты', { status: 500 });
  }
}
