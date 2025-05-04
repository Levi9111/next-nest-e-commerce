import { Role } from 'src/common/enums/role.enum';
import { z } from 'zod';

export const RegisterSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(Object.values(Role) as [string, ...string[]]).optional(),
});

export type RegisterDto = z.infer<typeof RegisterSchema>;
