import { Model } from 'mongoose';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
// import { Ingredient, IngredientDocument } from 'src/ingredients/entities/ingredient.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    // @InjectModel(Ingredient.name) private ingredientModel: Model<IngredientDocument>,
  ) { }

  async create(createProductDto: CreateProductDto): Promise<ProductDocument> {
    try {
      const product = new this.productModel(createProductDto);
      // const hasIngredient = await this.ingredientModel.findOne(createProductDto.ingredients)
      await product.populate('ingredients').execPopulate();
      await product.save();
      return product;
    } catch (error) {
      // throw new BadRequestException('Failed to create new product!');
      return error;

    }

  }

  async findAll(): Promise<ProductDocument[]> {
    const products = await this.productModel.find().populate('ingredients');
    products.forEach(product => {
      product.ingredients.forEach(ingredient => {
        product.value += ingredient.value //not working?
      })
    });
    if (!(products.length > 0)) throw new NotFoundException('No Products found.');
    return products;
  }

  async findOne(id: string): Promise<ProductDocument> {
    const hasProduct = await this.productModel.findById(id);
    if (!hasProduct) throw new NotFoundException('Product not found to update.');
    return hasProduct
  }

  async updateOne(id: string, updateProductDto: UpdateProductDto): Promise<ProductDocument> {
    try {
      return await this.productModel.findByIdAndUpdate(
        { _id: id },
        { $set: updateProductDto },
        { new: true },
      );
    } catch (error) {
      throw new NotFoundException('Product not found to update.');
    }

  }

  async deleteOne(id: string): Promise<any> {
    return await this.productModel.deleteOne({ _id: id }).exec();
  }

  async productAvailable(id: string): Promise<Boolean> {
    var productAvailable = false;
    const product = await this.productModel.findById(id).populate('ingredients').exec();
    product.ingredients.forEach(ingredient => {
      ingredient.quantity > 0 ? productAvailable = true : productAvailable = false;
    });

    return productAvailable;
  }

  async uploadProductPicture(id: string, file: Express.Multer.File): Promise<ProductDocument> {
    const product = await this.productModel.findById(id);
    if (!product) throw new NotFoundException('Upload failed, product not found!');

    //Image type validation
    if (!(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg")) throw new BadRequestException('Update only allows types: .Png .Jpg .Jpeg');

    product.image_file_name = file.filename;
    return await this.productModel.findByIdAndUpdate(
      { _id: id },
      { $set: product },
      { new: true });
  }

}