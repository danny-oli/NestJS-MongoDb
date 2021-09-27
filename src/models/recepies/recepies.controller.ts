import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Res
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { RecepiesService } from './recepies.service';
import { CreateRecepiDto } from './dto/create-recepi.dto';
import { UpdateRecepiDto } from './dto/update-recepi.dto';
import { Recepi } from './entities/recepi.entity';



@UseGuards(JwtAuthGuard)
@Controller('recepies')
export class RecepiesController {
  constructor(
    private readonly recepiesService: RecepiesService,
  ) { }

  @Post()
  async create(@Body() createRecepiDto: CreateRecepiDto): Promise<Recepi> {
    return await this.recepiesService.create(createRecepiDto);
  }

  @Get()
  async findAll(): Promise<Recepi[]> {
    return await this.recepiesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Recepi> {
    return await this.recepiesService.findOne(id);
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateRecepiesDto: UpdateRecepiDto,
  ): Promise<Recepi> {
    return await this.recepiesService.updateOne(id, updateRecepiesDto);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<any> {
    return this.recepiesService.deleteOne(id);
  }
}
