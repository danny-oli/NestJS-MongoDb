import { IsString, IsArray, IsNumber } from 'class-validator';
import { Ingredient } from '../../ingredients/entities/ingredient.entity';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsArray()
  ingredients: Ingredient[];

  @IsString()
  image_file_name: string;
  
  @IsNumber()
  value: number;

  @IsNumber()
  cost: number;
}
