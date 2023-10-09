import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';

import { PostValidator, PostValidatorPublish } from '@/lib/validators/post';
import { z } from 'zod';

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();

    const { postId } = PostValidatorPublish.parse(body);

    await db.post.update({
      where: {
        id: postId,
      },
      data: {
        published: true,
      },
    });

    return new Response('OK');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Пост не опубликован', { status: 400 });
    }

    return new Response('Не удалось опубликовать пост, попробуйте позже', {
      status: 500,
    });
  }
}
