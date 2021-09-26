import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'
import { IsArray, ValidateNested } from 'class-validator';

import { Ingredient } from 'src/ingredients/entities/ingredient.entity';




export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop()
  image_file_name: string;

  @IsArray()
  //Validate all nested objects ObjectIds
  @ValidateNested({ each: true })
  //Indicates that ingredients is a array of Ingredients that references IngredientModel
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }])
  ingredients: Ingredient[];

  @Prop()
  total_price: number;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);


