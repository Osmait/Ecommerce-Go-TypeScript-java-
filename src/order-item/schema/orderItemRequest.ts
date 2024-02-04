import { z } from 'zod';

export const OrderItemRequest = z

  .object({
    productId: z.string().max(50).min(2),
    quantity: z.number().min(1),
    orderId: z.string().max(255).min(2),
  })
  .required();

export type OrderItemRequestDto = z.infer<typeof OrderItemRequest>;
