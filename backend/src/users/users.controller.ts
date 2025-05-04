import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { CreateUserSchema } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(CreateUserSchema))
    body: Record<string, unknown>,
  ) {
    return this.userService.createUser(body);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
