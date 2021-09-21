import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IngredientController } from './Ingredient.controller';
import { IngredientService } from './Ingredient.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest')],
  controllers: [IngredientController],
  providers: [IngredientService],
})

export class IngredientModule {}
