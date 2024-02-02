import { z } from 'zod';

export const CategoryFilters = z.object({
  skip: z
    .string()
    .transform((val, ctx) => {
      const parsed = parseInt(val);
      if (isNaN(parsed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Not a number',
        });
        return z.NEVER;
      }
      return parsed;
    })
    .optional(),

  take: z
    .string()
    .transform((val, ctx) => {
      const parsed = parseInt(val);
      if (isNaN(parsed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Not a number',
        });
        return z.NEVER;
      }
      return parsed;
    })
    .optional(),

  orderBy: z.enum(['name', 'description', 'createdAt']).default('name'),
  orderDir: z.enum(['asc', 'desc']).default('asc'),
  filterBy: z.enum(['name', 'createdAt', 'description']).optional(),
  filterParam: z.string().optional(),
});

export type CategoryFiltersDto = z.infer<typeof CategoryFilters>;
