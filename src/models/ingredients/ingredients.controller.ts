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

@UseGuards(JwtAuthGuard)
@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) { }

  @Post()
  async create(@Body() createIngredientDto: CreateIngredientDto): Promise<IngredientDocument> {
    return await this.ingredientsService.create(createIngredientDto);
  }

  @Get()
  async findAll(): Promise<IngredientDocument[]> {
    return await this.ingredientsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IngredientDocument> {
    return await this.ingredientsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ): Promise<IngredientDocument> {
    return await this.ingredientsService.updateOne(id, updateIngredientDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.ingredientsService.deleteOne(id);
  }
}
