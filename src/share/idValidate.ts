import { z } from 'zod';

export const idValidate = z
  .object({
    id: z.string().uuid(),
  })
  .required();

export type idValidateDto = z.infer<typeof idValidate>;
