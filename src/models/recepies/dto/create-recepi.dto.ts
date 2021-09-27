import { IsNumber, IsString } from 'class-validator';
import { Ingredient } from '../../ingredients/entities/ingredient.entity';

export class CreateRecepiDto {

  @IsString()
  ingredient: Ingredient;

  @IsNumber()
  quantity: number;
}
