import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import { PostUpdateValidator, PostValidator } from '@/lib/validators/post';
import { z } from 'zod';

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();

    const { categoryId, title, content, slug } =
      PostUpdateValidator.parse(body);
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

    await db.post.update({
      where: {
        slug: slug,
      },
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
