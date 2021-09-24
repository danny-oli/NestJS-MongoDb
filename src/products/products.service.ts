import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) { }

  async create(createProductDto: CreateProductDto): Promise<ProductDocument> {
    try {
      const user = new this.productModel(createProductDto);
      await user.populate('ingredients').execPopulate();

      return user.save();
    } catch (error) {

    }

  }

  async findAll(): Promise<ProductDocument[]> {
    return await this.productModel.find();
  }

  async findOne(id: string): Promise<ProductDocument> {
    return await this.productModel.findById(id);
  }

  async updateOne(id: string, updateProductDto: UpdateProductDto): Promise<ProductDocument> {
    return await this.productModel.findByIdAndUpdate(
      { _id: id },
      { $set: updateProductDto },
      { new: true },
    );
  }

  async deleteOne(id: string): Promise<any> {
    return await this.productModel.deleteOne({ _id: id }).exec();
  }
}
