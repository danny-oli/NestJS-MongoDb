import { Model } from 'mongoose';
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ingredient, IngredientDocument } from './entities/ingredient.entity';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectModel(Ingredient.name)
    private ingredientModel: Model<IngredientDocument>,
  ) { }

  async create(createIngredientsDto: CreateIngredientDto): Promise<IngredientDocument> {
    try {
      const hasIngredient = this.findByName(createIngredientsDto.name)
      if (hasIngredient) throw new ConflictException(`ingredient:${createIngredientsDto.name} already exists!`);
      const user = new this.ingredientModel(createIngredientsDto);
      return await user.save();
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<IngredientDocument[]> {
    try {
      const hasIngredients = await this.ingredientModel.find();
      if (!hasIngredients.length) throw new NotFoundException(`No Ingredients found`);
      return hasIngredients;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<IngredientDocument> {
    try {
      const hasIngredient = await this.ingredientModel.findById(id);
      if (!hasIngredient) throw new NotFoundException(`Ingredient was not found!`);
      return hasIngredient;
    } catch (error) {
      throw error;
    }
  }

  async findByName(name: string): Promise<IngredientDocument> {
    try {
      const ingredient = await this.ingredientModel.findOne({ name }).exec();
      if (!ingredient) throw new NotFoundException(`Ingredient: ${name} was not found! `)
      return ingredient;
    } catch (error) {
      throw error;
    }

  }

  async updateOne(id: string, updateIngredientDto: UpdateIngredientDto): Promise<IngredientDocument> {
    try {
      const hasIngredient = await this.ingredientModel.findById(id);
      if (!hasIngredient) throw new NotFoundException(`Ingredient not found to update!`);
      return await this.ingredientModel.findByIdAndUpdate(
        { _id: id },
        { $set: updateIngredientDto },
        { new: true },
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteOne(id: string): Promise<any> {

    try {
      const hasIngredient = await this.ingredientModel.findById(id);
      if (!hasIngredient) throw new NotFoundException(`Ingredient not to be deleted!`);
      return await this.ingredientModel.deleteOne({ _id: id }).exec();
    } catch (error) {
      throw error;
    }
  }


}
