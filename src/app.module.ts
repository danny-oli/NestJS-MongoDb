import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { IngredientsModule } from './ingredients/ingredients.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:*****@cluster0.93lhl.mongodb.net/test',
    ),
    UsersModule,
    IngredientsModule,
  ],
})
export class AppModule {}
