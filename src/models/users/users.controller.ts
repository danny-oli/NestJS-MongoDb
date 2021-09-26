import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from './entities/user.entity';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDocument> {
    const userExist = await this.usersService.findByUsername(createUserDto.username)
    if (userExist) throw new ConflictException(`username:${createUserDto.username} already exists!`);
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<UserDocument[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserDocument> {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  async updateOne(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UserDocument> {
    return await this.usersService.updateOne(id, updateUserDto);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<any> {
    return await this.usersService.deleteOne(id);
  }
}
