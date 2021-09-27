import { Model } from 'mongoose';
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import mongoose = require('mongoose');

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    // @InjectModel(Ingredient.name) private ingredientModel: Model<IngredientDocument>,
  ) { }

  async create(createProductDto: CreateProductDto): Promise<ProductDocument> {
    try {
      const hasProduct: ProductDocument = await this.productModel.findOne({ name: createProductDto.name })
      if (hasProduct) throw new BadRequestException(`Procuct: ${createProductDto.name} already exists!`);
      const product = new this.productModel(createProductDto);
      // const hasIngredient = await this.ingredientModel.findOne(createProductDto.ingredients)
      await product.populate('recepies', 'ingredients').execPopulate();
      await product.save();
      return product;
    } catch (error) {
      return error;
    }

  }

  async findAll(): Promise<ProductDocument[]> {
    try {
      const products: ProductDocument[] = await this.productModel.find().populate(
        {
          path: 'recepies',
          populate: {
            path: 'ingredient'
          }
        }
      );
      if (!(products.length)) throw new NotFoundException('No Products found.');
      products.forEach(product => {
        product.recepies.forEach(recepies => {
          product.cost += recepies.ingredient.value
        })
      });
      return products;
    } catch (error) {
      throw error;
    }


  }

  async findOne(id: string): Promise<ProductDocument> {
    try {
      if (!this.validateObjectId(id)) throw new BadRequestException(`Invalid ObjectId sent!`);
      const product: ProductDocument = await this.productModel.findById(id).populate(
        {
          path: 'recepies',
          populate: {
            path: 'ingredient'
          }
        }
      );
      if (!product) throw new NotFoundException('Product not found!');
      product.recepies.forEach(recepies => {
        product.cost += recepies.ingredient.value
      });
      return product
    } catch (error) {
      throw error;
    }

  }

  async findByName(name: string): Promise<ProductDocument> {
    try {
      const product: ProductDocument = await this.productModel.findOne({ name }).exec();
      if (!product) throw new NotFoundException(`Procuct: ${name} was not found! `)
      return product;
    } catch (error) {
      throw error;
    }

  }

  async updateOne(id: string, updateProductDto: UpdateProductDto): Promise<ProductDocument> {
    try {
      if (!this.validateObjectId(id)) throw new BadRequestException(`Invalid ObjectId sent!`);
      const hasProduct: ProductDocument = await this.productModel.findById(id);
      if (!hasProduct) throw new NotFoundException(`Prodfuct not found to update!`);
      return await this.productModel.findByIdAndUpdate(
        { _id: id },
        { $set: updateProductDto },
        { new: true },
      );
    } catch (error) {
      throw error;
    }

  }

  async deleteOne(id: string): Promise<any> {
    try {
      if (!this.validateObjectId(id)) throw new BadRequestException(`Invalid ObjectId sent!`);
      const product: ProductDocument = await this.productModel.findById(id);
      if (!product) throw new NotFoundException(`Procuct not found to be deleted! `)
      return await this.productModel.deleteOne({ _id: id }).exec();
    } catch (error) {
      throw error;
    }
  }

  async productAvailable(id: string): Promise<any> {
    try {
      if (!this.validateObjectId(id)) throw new BadRequestException(`Invalid ObjectId sent!`);
      const product: ProductDocument = await this.productModel.findById(id).populate(
        {
          path: 'recepies',
          populate: {
            path: 'ingredient'
          }
        }
      ).exec();
      if (!product) throw new NotFoundException(`Product not found!`);
      var productAvailable: Boolean = false;
      product.recepies.forEach(recepi => {
        recepi.ingredient.quantity > 0 ? productAvailable = true : productAvailable = false;
      });

      return { response: { product: product.name, available: productAvailable } };
    } catch (error) {
      throw error;
    }
  }

  async uploadProductPicture(id: string, file: Express.Multer.File): Promise<ProductDocument> {
    try {
      if (!this.validateObjectId(id)) throw new BadRequestException(`Invalid ObjectId sent!`);
      const product: ProductDocument = await this.productModel.findById(id);
      if (!product) throw new NotFoundException('Upload failed, product not found!');

      //Image type validation
      if (!(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"))
        throw new BadRequestException('Update only allows types: .Png .Jpg .Jpeg');

      product.image_file_name = file.filename;
      return await this.productModel.findByIdAndUpdate(
        { _id: id },
        { $set: product },
        { new: true });
    }
    catch (error) {
      throw error;
    }
  }

  validateObjectId(id: string) {
    return mongoose.Types.ObjectId.isValid(id);
  }
}
