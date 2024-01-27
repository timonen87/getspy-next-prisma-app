import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { PostDeletePublish } from '@/lib/validators/post';
import { NextResponse } from 'next/server';

import { z } from 'zod';

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { postId } = PostDeletePublish.parse(body);

    if (!postId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const postById = db.post.findFirst({
      where: {
        id: postId,
        authorId: session.user.id,
      },
    });

    if (!postById) {
      return new NextResponse('Unauthorized', { status: 405 });
    }

    const post = await db.post.delete({
      where: {
        id: postId,
      },
    });

    return new Response('Пост успешно удален', { status: 200 });
  } catch (error) {
    return new Response('Не удалось получить посты', { status: 500 });
  }
}

// export async function DELETE(
//   req: Request,
//   { params }: { params: { storeId: string } }
// ) {
//   try {
//     const session = await getAuthSession();

//     if (!session) {
//       return new NextResponse('Unauthenticated', { status: 403 });
//     }

//     if (!params.storeId) {
//       return new NextResponse('Store id is required', { status: 400 });
//     }

//     const store = await db.store.deleteMany({
//       where: {
//         id: params.storeId,
//         creatorId: session.user.id,
//       },
//     });

//     return NextResponse.json(store);
//   } catch (error) {
//     console.log('[STORE_DELETE]', error);
//     return new NextResponse('Internal error', { status: 500 });
//   }
// }
