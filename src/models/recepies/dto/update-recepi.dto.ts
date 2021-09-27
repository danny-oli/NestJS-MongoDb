import { PartialType } from '@nestjs/mapped-types';
import { CreateRecepiDto } from './create-recepi.dto';

export class UpdateRecepiDto extends PartialType(CreateRecepiDto) {}
