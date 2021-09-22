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
  ) {}

  create(createProductDto: CreateProductDto) {
    const user = new this.productModel(createProductDto);
    return user.save();
  }

  findAll() {
    return this.productModel.find();
  }

  findOne(id: string) {
    return this.productModel.findById(id);
  }

  updateOne(id: string, updateProductDto: UpdateProductDto) {
    return this.productModel.findByIdAndUpdate(
      { _id: id },
      { $set: updateProductDto },
      { new: true },
    );
  }

  deleteOne(id: string) {
    return this.productModel.deleteOne({ _id: id }).exec();
  }
}
