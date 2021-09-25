import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';

export type UserDocument = User & Document;


@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  username: string;

  @Prop()


  @Exclude({ toPlainOnly: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
