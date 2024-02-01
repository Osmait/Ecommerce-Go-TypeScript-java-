import { z } from 'zod';

export const ProductRequest = z

  .object({
    name: z.string().max(255).min(2),
    description: z.string().max(255).min(2),
    price: z.number().min(1),
    stock: z.number(),
    imagen: z.string().optional(),
    categoryId: z.string(),
  })
  .required();

export type ProductRequestDto = z.infer<typeof ProductRequest>;
