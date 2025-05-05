import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/common/enums/role.enum';
import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(Object.values(Role) as [string, ...string[]]).optional(),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;

export class CreateUserSwaggerDto {
  @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
  name: string;
  @ApiProperty({
    example: 'johndoe@email.com',
    description: 'Valid email address',
  })
  email: string;
  @ApiProperty({
    example: 'securepass123',
    description: 'Minimum 6 characters',
  })
  password: string;

  // role: Role;
}
