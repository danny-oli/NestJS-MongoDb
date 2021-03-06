import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type IngredientDocument = Ingredient & Document;

@Schema()
export class Ingredient {
  @Prop()
  name: string;

  @Prop()
  quantity: number;

  @Prop()
  measurement: string;

  @Prop()
  value: number;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);
