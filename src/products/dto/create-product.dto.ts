import { IsString, IsInt } from 'class-validator';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  image: string;

  @IsString()
  ingredients: Ingredient;

  @IsInt()
  quantity: number;

  @IsString()
  created_by: string;
}
