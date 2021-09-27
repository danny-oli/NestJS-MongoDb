import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ValidateNested } from 'class-validator';
import { Recepi } from 'src/models/recepies/entities/recepi.entity';

import * as mongoose from 'mongoose'

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop()
  image_file_name: string;

  //Validate all nested objects ObjectIds
  @ValidateNested({ each: true })
  //Indicates that ingredients is a array of Ingredients that references IngredientModel
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Recepi' }])
  recepies: Recepi[];

  @Prop()
  value: number;

  @Prop()
  cost: number;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);


