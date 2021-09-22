import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { ProductsModule } from './products/products.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:*****@cluster0.93lhl.mongodb.net/test',
    ),
    UsersModule,
    IngredientsModule,
    ProductsModule,
  ],
})
export class AppModule {}
