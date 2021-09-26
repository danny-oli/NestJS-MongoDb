import { IsString, IsInt } from 'class-validator';


export class CreateIngredientDto {
  @IsString()
  name: string;

  @IsInt()
  quantity: number;

  @IsString()
  measurement: string;

  @IsInt()
  value: number;

  @IsString()

  created_at: string;
  @IsString()
  created_by: string;
}
