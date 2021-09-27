import { Model } from 'mongoose';
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recepi, RecepiDocument } from './entities/recepi.entity';
import { CreateRecepiDto } from './dto/create-recepi.dto';
import { UpdateRecepiDto } from './dto/update-recepi.dto';

import mongoose = require('mongoose');

@Injectable()
export class RecepiesService {
    constructor(
        @InjectModel(Recepi.name) private recepiModel: Model<RecepiDocument>,
    ) { }

    async create(createRecepiDto: CreateRecepiDto): Promise<RecepiDocument> {
        try {
            //   const hasProduct: RecepiDocument = await this.recepiModel.findOne({ name: createRecepiDto.name })
            //   if (hasProduct) throw new BadRequestException(`Procuct: ${createRecepiDto.name} already exists!`);
            // const hasIngredient = await this.ingredientModel.findOne(createRecepiDto.ingredients)
            const recepi = new this.recepiModel(createRecepiDto);
            await recepi.populate('ingredients').execPopulate();
            await recepi.save();
            return recepi;
        } catch (error) {
            return error;
        }

    }

    //   async findAll(): Promise<RecepiDocument[]> {
    //     try {
    //       const products: RecepiDocument[] = await this.recepiModel.find().populate('ingredients');
    //       if (!(products.length)) throw new NotFoundException('No Products found.');
    //       products.forEach(product => {
    //         product.ingredients.forEach(ingredient => {
    //           product.cost += ingredient.value
    //         })
    //       });
    //       return products;
    //     } catch (error) {
    //       throw error;
    //     }


    //   }

    //   async findOne(id: string): Promise<RecepiDocument> {
    //     try {
    //       if (!this.validateObjectId(id)) throw new BadRequestException(`Invalid ObjectId sent!`);
    //       const product: RecepiDocument = await this.recepiModel.findById(id);
    //       if (!product) throw new NotFoundException('Product not found!');
    //       return product
    //     } catch (error) {
    //       throw error;
    //     }

    //   }

    //   async findByName(name: string): Promise<RecepiDocument> {
    //     try {
    //       const product: RecepiDocument = await this.recepiModel.findOne({ name }).exec();
    //       if (!product) throw new NotFoundException(`Procuct: ${name} was not found! `)
    //       return product;
    //     } catch (error) {
    //       throw error;
    //     }

    //   }

    //   async updateOne(id: string, updaterecepiDto: UpdateRecepiDto): Promise<RecepiDocument> {
    //     try {
    //       if (!this.validateObjectId(id)) throw new BadRequestException(`Invalid ObjectId sent!`);
    //       const hasProduct: RecepiDocument = await this.recepiModel.findById(id);
    //       if (!hasProduct) throw new NotFoundException(`Prodfuct not found to update!`);
    //       return await this.recepiModel.findByIdAndUpdate(
    //         { _id: id },
    //         { $set: updateProductDto },
    //         { new: true },
    //       );
    //     } catch (error) {
    //       throw error;
    //     }

    //   }

    //   async deleteOne(id: string): Promise<any> {
    //     try {
    //       if (!this.validateObjectId(id)) throw new BadRequestException(`Invalid ObjectId sent!`);
    //       const product: RecepiDocument = await this.recepiModel.findById(id);
    //       if (!product) throw new NotFoundException(`Procuct not found to be deleted! `)
    //       return await this.recepiModel.deleteOne({ _id: id }).exec();
    //     } catch (error) {
    //       throw error;
    //     }
    //   }

    validateObjectId(id: string) {
        return mongoose.Types.ObjectId.isValid(id);
    }
}
