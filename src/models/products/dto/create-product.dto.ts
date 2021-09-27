import { IsString, IsArray, IsNumber } from 'class-validator';
import { Recepi } from 'src/models/recepies/entities/recepi.entity';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsArray()
  recepies: Recepi[];

  @IsString()
  image_file_name: string;
  
  @IsNumber()
  value: number;

  @IsNumber()
  cost: number;
}
