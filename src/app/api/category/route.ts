import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { CategoryValidator } from '@/lib/validators/category';
import { z } from 'zod';

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { name } = CategoryValidator.parse(body);

    const categoryExists = await db.category.findFirst({
      where: {
        name,
      },
    });

    if (categoryExists) {
      return new Response('Категория уже существует', { status: 409 });
    }

    const category = await db.category.create({
      data: {
        name,
        creatorId: session.user.id,
      },
    });

    await db.subscription.create({
      data: {
        userId: session.user.id,
        categoryId: category.id,
      },
    });
    return new Response(category.name);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response('Не удалось создать категорию', { status: 500 });
  }
}
