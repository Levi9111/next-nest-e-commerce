import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import {
  CreateUserDto,
  CreateUserSchema,
  CreateUserSwaggerDto,
} from './dtos/create-user.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @ApiBody({ type: CreateUserSwaggerDto })
  @ApiCreatedResponse({ description: 'User Created successfully' })
  @ApiBadRequestResponse({ description: 'Invalid User Data' })
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  create(
    @Body()
    body: CreateUserDto,
  ) {
    return this.userService.createUser(body);
  }

  @Get(':id')
  @ApiParam({ name: 'id', example: '65f1c38a1c40ff001234abcd' })
  @ApiOkResponse({ description: 'User found' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
