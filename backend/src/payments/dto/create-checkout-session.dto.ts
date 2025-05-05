import { z } from 'zod';

export const createCheckoutSchema = z.object({
  items: z.array(
    z.object({
      name: z.string(),
      price: z.number().positive(),
      quantity: z.number().int().positive(),
    }),
  ),
});

export type createCheckoutDto = z.infer<typeof createCheckoutSchema>;
