import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async create(createProductDto: any): Promise<ProductDocument> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(): Promise<ProductDocument[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<ProductDocument> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async update(id: string, updateProductDto: any): Promise<ProductDocument> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
    if (!updatedProduct) {
      throw new NotFoundException('Product not found');
    }
    return updatedProduct;
  }

  async delete(id: string): Promise<any> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();
    if (!deletedProduct) {
      throw new NotFoundException('Product not found');
    }
    return { message: 'Product deleted successfully' };
  }
}
