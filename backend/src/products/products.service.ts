import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dtos/create-product.dto';
import { Model, Types } from 'mongoose';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(data: CreateProductDto): Promise<Product> {
    const product = new this.productModel(data);
    return product.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product | null> {
    if (!Types.ObjectId.isValid(id)) return null;

    const product = await this.productModel.findById(id).exec();

    if (!product) throw new NotFoundException('Product not found');

    return product;
  }

  async update(id: string, data: UpdateProductDto): Promise<Product | null> {
    if (!Types.ObjectId.isValid(id)) return null;

    const updateProduct = await this.productModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!updateProduct) throw new NotFoundException('Product not found');

    return updateProduct;
  }

  async delete(id: string): Promise<Product | null> {
    if (!Types.ObjectId.isValid(id)) return null;

    const deletedProduct = await this.productModel.findByIdAndDelete(id);

    if (!deletedProduct) throw new NotFoundException('Product not found');

    return deletedProduct;
  }
}
