import { Model } from 'mongoose';
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const userExist = await this.findByUsername(createUserDto.username)
    if (userExist) throw new ConflictException(`username:${createUserDto.username} already exists!`);
    try {
      const user = new this.userModel(createUserDto);
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(user.password, salt);
      user.password = hashedPassword;

      return await user.save();
    } catch (error) {
      throw new BadRequestException(`ErrorLog:${error}`)
    }
  }

  async findAll(): Promise<UserDocument[]> {
    try {
      return await this.userModel.find();
    } catch (error) {
      throw new NotFoundException(`No Users found. Errorlog:${error}`);
    }
  }

  async findOne(id: string): Promise<UserDocument> {
    try {
      const userFound = await this.userModel.findById(id);
      if (!userFound) throw new NotFoundException();
      return userFound;
    } catch (error) {
      throw new NotFoundException(`No Users found. Errorlog:${error}`);
    }
  }

  async findByUsername(username: string): Promise<UserDocument> {
    return (await this.userModel.findOne({ username }).exec());
  }

  async updateOne(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
    return await this.userModel.findByIdAndUpdate(
      { _id: id },
      { $set: updateUserDto },
      { new: true },
    );
  }

  async deleteOne(id: string): Promise<any> {
    return await this.userModel.deleteOne({ _id: id }).exec();
  }
}
