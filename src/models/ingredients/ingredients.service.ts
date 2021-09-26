import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
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
    const user = new this.ingredientModel(createIngredientsDto);
    return await user.save();
  }

  async findAll(): Promise<IngredientDocument[]> {
    return await this.ingredientModel.find();
  }

  async findOne(id: string): Promise<IngredientDocument> {
    return await this.ingredientModel.findById(id);
  }

  async updateOne(id: string, updateIngredientDto: UpdateIngredientDto): Promise<IngredientDocument> {
    return await this.ingredientModel.findByIdAndUpdate(
      { _id: id },
      { $set: updateIngredientDto },
      { new: true },
    );
  }

  async deleteOne(id: string): Promise<any> {
    return await this.ingredientModel.deleteOne({ _id: id }).exec();
  }
}
