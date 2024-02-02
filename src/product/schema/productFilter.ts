import { z } from 'zod';

export const ProductFilters = z.object({
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
  filterBy: z.enum(['name', 'category', 'createdAt', 'description']).optional(),
  filterParam: z.string().optional(),

  minPrice: z
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

  maxPrice: z
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
});

export type ProductFiltersDto = z.infer<typeof ProductFilters>;
