import { z } from 'zod';

export const CreateProductSchema = z.object({
  name: z.string().min(2, 'Product name must be at least 2 characters'),
  description: z.string().optional(),
  price: z.number().positive('Price must be positive'),
  stock: z.number().int().nonnegative('Stock must be a non-negative integer'),
  category: z.string().min(2, 'Category must be at least 2 characters'),
  images: z.array(z.string().url('Each image must be a valid URL')).optional(),
});

export type CreateProductDto = z.infer<typeof CreateProductSchema>;
