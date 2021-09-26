import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { IngredientDocument } from './entities/ingredient.entity';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createIngredientDto: CreateIngredientDto): Promise<IngredientDocument> {
    return await this.ingredientsService.create(createIngredientDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<IngredientDocument[]> {
    return await this.ingredientsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IngredientDocument> {
    return await this.ingredientsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ): Promise<IngredientDocument>{
    return await this.ingredientsService.updateOne(id, updateIngredientDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any>{
    return this.ingredientsService.deleteOne(id);
  }
}
