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
  ) {}

  create(createIngredientsDto: CreateIngredientDto) {
    const user = new this.ingredientModel(createIngredientsDto);
    return user.save();
  }

  findAll() {
    return this.ingredientModel.find();
  }

  findOne(id: string) {
    return this.ingredientModel.findById(id);
  }

  updateOne(id: string, updateIngredientDto: UpdateIngredientDto) {
    return this.ingredientModel.findByIdAndUpdate(
      { _id: id },
      { $set: updateIngredientDto },
      { new: true },
    );
  }

  deleteOne(id: string) {
    return this.ingredientModel.deleteOne({ _id: id }).exec();
  }
}
