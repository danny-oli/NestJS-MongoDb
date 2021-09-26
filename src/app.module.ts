import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { ProductsModule } from './products/products.module';
import { MulterModule } from '@nestjs/platform-express';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cluster0.93lhl.mongodb.net/test',
    ),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './images',
      }),
    }),
    AuthModule,
    UsersModule,
    IngredientsModule,
    ProductsModule,
  ],
})
export class AppModule { }
