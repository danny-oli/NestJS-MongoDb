import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { IngredientDto } from './dto/ingredient.dto';
import { IngredientService } from './ingredient.service';
import { Ingredient } from './interfaces/Ingredient.interface';

@Controller('danny')
export class IngredientController {
  constructor(private ingredientService: IngredientService) {}

  @Get()
  findAll(): Ingredient[] {
    console.log(this.ingredientService.findAll());
    return this.ingredientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return `Ingredient: ${id}`;
  }

  @Post()
  create(@Body() cngredientDto: IngredientDto): string {
    return `
        name: ${cngredientDto.name} 
        quantity: ${cngredientDto.quantity} 
        measurement: ${cngredientDto.measurement}
        value: ${cngredientDto.value} 
    `;
  }

  @Put(':id')
  update(
    @Body() updateIngredientDto: IngredientDto,
    @Param('id') id: string,
  ): string {
    0;
    return `Update Id: ${id} - Name: ${updateIngredientDto.name}`;
  }

  @Delete(':id')
  delete(@Param('id') id) {
    return `Delete: ${id}`;
  }
}
