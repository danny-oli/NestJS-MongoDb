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
      const product = new this.productModel(createProductDto);
      await product.populate('ingredients').execPopulate();
      return await product.save();
    } catch (error) {

    }

  }

  async findAll(): Promise<ProductDocument[]> {
    const products = await this.productModel.find().populate('ingredients');
    products.forEach(product => {
      product.ingredients.value ? product.total_price = product.ingredients.value : 'Invalid Ingredient Code'
    });
    return products
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

  async productAvailable(id: string): Promise<Boolean> {
    var productAvailable = false;
    const product = await this.productModel.findById(id).populate('ingredients').exec();
    product.ingredients.quantity > 0 ? productAvailable = true : productAvailable = false;
    return productAvailable;
  }

}
