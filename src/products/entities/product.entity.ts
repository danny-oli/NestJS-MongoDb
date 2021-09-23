import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';

import * as mongoose from 'mongoose'

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop()
  image: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' })
  ingredients: Ingredient

  @Prop({ required: true })
  quantity: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
