import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { IngredientController } from './ingredient/ingredient.controller';
import { IngredientService } from './ingredient/ingredient.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest')],
  controllers: [AppController, IngredientController],
  providers: [AppService, IngredientService],
})
export class AppModule {}
