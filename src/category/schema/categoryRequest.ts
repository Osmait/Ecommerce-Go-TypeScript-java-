import { z } from 'zod';

export const CategoryRequest = z

  .object({
    name: z.string().max(50).min(2),
    description: z.string().max(255).min(2),
  })
  .required();

export type CategoryRequestDto = z.infer<typeof CategoryRequest>;
