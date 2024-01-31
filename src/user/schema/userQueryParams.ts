import { z } from 'zod';
const customValidator = (data) => {
  const { email, id } = data;

  // Verifica que al menos uno de los dos campos no sea null
  if (email === null && id === null) {
    throw new Error(
      'You must provide either an email or an id, but not both or none.',
    );
  }

  return true;
};

export const UserQueryParamsSchema = z
  .object({
    email: z.string().email().max(50).optional(),
    id: z.string().uuid().optional(),
  })
  .refine(customValidator, {
    message: 'You must provide either an email or an id, but not both or none.',
  });

export type UserQueryParams = z.infer<typeof UserQueryParamsSchema>;
