import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { IngredientsModule } from './ingredients/ingredients.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => configService.getMongoConfig(),
    }),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './images',
      }),
    }),
    ConfigModule,
    AuthModule,
    UsersModule,
    IngredientsModule,
    ProductsModule,
  ],
})
export class AppModule { }
