import { z } from 'zod';

export const PostValidator = z.object({
  title: z
    .string()
    .min(3, { message: 'Заголвовк должен быть длинее 3 симвовлов' })
    .max(128, { message: 'Заголвовк не должен быть длинее 128 симвовлов' }),
  categoryId: z.string(),
  content: z.any(),
});

export type PostCreatoionRequest = z.infer<typeof PostValidator>;
