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

    async findAll(): Promise<RecepiDocument[]> {
        try {
            const recepies: RecepiDocument[] = await this.recepiModel
                .find()
                .populate({ path: 'ingredient' })
                .exec();
            if (!recepies) throw new NotFoundException('No Recepies found.');
            return recepies;
        } catch (error) {
            throw error;
        }


    }

    async findOne(id: string): Promise<RecepiDocument> {
        try {
            if (!this.validateObjectId(id)) throw new BadRequestException(`Invalid ObjectId sent!`);
            const recepi: RecepiDocument = await this.recepiModel.findById(id).populate({ path: 'ingredient' });
            if (!recepi) throw new NotFoundException('Recepi not found!');
            return recepi
        } catch (error) {
            throw error;
        }

    }

    async updateOne(id: string, updaterecepiDto: UpdateRecepiDto): Promise<RecepiDocument> {
        try {
            if (!this.validateObjectId(id)) throw new BadRequestException(`Invalid ObjectId sent!`);
            const hasRecepi: RecepiDocument = await this.recepiModel.findById(id).populate('ingredients');
            if (!hasRecepi) throw new NotFoundException(`Recepi not found to update!`);
            return await this.recepiModel.findByIdAndUpdate(
                { _id: id },
                { $set: updaterecepiDto },
                { new: true },
            );
        } catch (error) {
            throw error;
        }

    }

    async deleteOne(id: string): Promise<any> {
        try {
            if (!this.validateObjectId(id)) throw new BadRequestException(`Invalid ObjectId sent!`);
            const recepi: RecepiDocument = await this.recepiModel.findById(id);
            if (!recepi) throw new NotFoundException(`Recepi not found to be deleted! `)
            return await this.recepiModel.deleteOne({ _id: id }).exec();
        } catch (error) {
            throw error;
        }
    }

    validateObjectId(id: string) {
        return mongoose.Types.ObjectId.isValid(id);
    }
}
