import { IsString, IsInt } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  image: string;

  @IsString()
  ingredients: string;

  @IsInt()
  quantity: number;

  @IsString()
  created_at: string;

  @IsString()
  created_by: string;
}
