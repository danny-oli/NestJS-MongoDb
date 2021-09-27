import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'

import { Ingredient } from '../../ingredients/entities/ingredient.entity';

export type RecepiDocument = Recepi & Document;

@Schema()
export class Recepi {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' })
  ingredient: Ingredient;

  @Prop()
  quantity: number;

}

export const RecepiesSchema = SchemaFactory.createForClass(Recepi);


