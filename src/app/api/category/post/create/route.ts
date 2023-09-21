import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';

import { PostValidator } from '@/lib/validators/post';
import { z } from 'zod';

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();

    const { categoryId, title, content } = PostValidator.parse(body);
    // verify user is subscribed to passed subreddit id
    const subscription = await db.subscription.findFirst({
      where: {
        categoryId,
        userId: session.user.id,
      },
    });

    if (!subscription) {
      return new Response('Подписаться на пост', { status: 400 });
    }

    await db.post.create({
      data: {
        title,
        content,
        authorId: session.user.id,
        categoryId,
      },
    });

    return new Response('OK');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Пост не создан', { status: 400 });
    }

    return new Response('Не удалось подписться, попробуйте позже', {
      status: 500,
    });
  }
}
