import { z } from 'zod';

export const UpdateProductSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  price: z.number().positive().optional(),
  stock: z.number().int().nonnegative().optional(),
  category: z.string().min(2).optional(),
  images: z.array(z.string().url()).optional(),
});

export type UpdateProductDto = z.infer<typeof UpdateProductSchema>;
