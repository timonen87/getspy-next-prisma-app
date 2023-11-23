import { z } from 'zod';

export const UsernameValidator = z.object({
  name: z
    .string()
    .min(3)
    .max(32)
    .regex(/^[a-zA-Z0-9_]+$/),
  email: z.string().email(),
  image: z.string(),
  role: z.string(),
});
