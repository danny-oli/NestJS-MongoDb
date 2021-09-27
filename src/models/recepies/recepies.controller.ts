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
  
  
  
  
  @Controller('recepies')
  export class RecepiesController {
    constructor(
      private readonly recepiesService: RecepiesService,
    ) { }
  
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createRecepiDto: CreateRecepiDto): Promise<Recepi> {
      return await this.recepiesService.create(createRecepiDto);
    }
  
    // @UseGuards(JwtAuthGuard)
    // @Get()
    // async findAll(): Promise<Recepi[]> {
    //   return await this.recepiesService.findAll();
    // }

    // @UseGuards(JwtAuthGuard)
    // @Get(':id')
    // async findOne(@Param('id') id: string): Promise<Recepi> {
    //   return await this.recepiesService.findOne(id);
    // }
  
    // @UseGuards(JwtAuthGuard)
    // @Patch(':id')
    // async updateOne(
    //   @Param('id') id: string,
    //   @Body() updateRecepiesDto: UpdateRecepiDto,
    // ): Promise<Recepi> {
    //   return await this.recepiesService.updateOne(id, updateRecepiesDto);
    // }
  
    // @UseGuards(JwtAuthGuard)
    // @Delete(':id')
    // async deleteOne(@Param('id') id: string): Promise<any> {
    //   return this.recepiesService.deleteOne(id);
    // }
  }
  