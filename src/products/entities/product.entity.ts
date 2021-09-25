import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'
import { Type } from 'class-transformer';
import { Validate, ValidateNested } from 'class-validator';

import { Ingredient } from 'src/ingredients/entities/ingredient.entity';
// import { IngredientExistsValidation } from '../products.validation';



export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop()
  image: string;

  // @Validate(IngredientExistsValidation)
  @ValidateNested({ each: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' })
  @Type(() => Ingredient)
  ingredients: Ingredient;

  @Prop({ required: true })
  quantity: number;

  @Prop()
  total_price: number;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop()
  created_by: string;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  // @Type(() => User)
  // created_by: User
}

export const ProductSchema = SchemaFactory.createForClass(Product);


