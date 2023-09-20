import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { CategorySubscriptionValidator } from '@/lib/validators/category';
import { z } from 'zod';

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();

    const { categoryId } = CategorySubscriptionValidator.parse(body);

    const subscriptionExsists = await db.subscription.findFirst({
      where: {
        categoryId,
        userId: session.user.id,
      },
    });

    if (subscriptionExsists) {
      return new Response('Вы уже подписаны на каттегорию', { status: 400 });
    }

    await db.subscription.create({
      data: {
        categoryId,
        userId: session.user.id,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Запрос не выполнен', { status: 422 });
    }

    return new Response('Не удалось подписться, попробуйте позже', {
      status: 500,
    });
  }
}
