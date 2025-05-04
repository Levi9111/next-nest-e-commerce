import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import {
  CreateProductDto,
  CreateProductSchema,
} from './dtos/create-product.dto';
import {
  UpdateProductDto,
  UpdateProductSchema,
} from './dtos/update-product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body(new ZodValidationPipe(CreateProductSchema)) body: CreateProductDto,
  ) {
    return this.productService.create(body);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productService.findOne(id);
    return product;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateProductSchema)) body: UpdateProductDto,
  ) {
    const updated = await this.productService.update(id, body);
    return updated;
  }

  //   TODO: implement soft delete functionality
  @Delete('id')
  async remove(@Param('id') id: string) {
    const deleted = await this.productService.delete(id);

    return deleted;
  }
}
