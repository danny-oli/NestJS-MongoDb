import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecepiesController } from './recepies.controller';
import { RecepiesService } from './recepies.service';
import { Recepi, RecepiesSchema } from './entities/recepi.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Recepi.name, schema: RecepiesSchema },
    ]),
  ],
  controllers: [RecepiesController],
  providers: [RecepiesService],
  exports: [RecepiesService]
})
export class RecepiesModule { }
