import { IsString, IsInt, IsArray } from 'class-validator';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsArray()
  ingredients: Ingredient[];

  @IsString()
  image_file_name: string;
}
