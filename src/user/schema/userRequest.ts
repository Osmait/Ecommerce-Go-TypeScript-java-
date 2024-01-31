import { z } from 'zod';

export const userRequest = z
  .object({
    name: z.string().max(50).min(2),
    lastName: z.string().max(50).min(2),
    email: z.string().email().max(50),
    password: z.string().min(6),
  })
  .required();

export type userRequestDto = z.infer<typeof userRequest>;
