import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  image: string;

  @Prop()
  value: string;

  @Prop()
  ingredients: string;

  @Prop()
  quantity: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
