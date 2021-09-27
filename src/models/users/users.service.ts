import { Model } from 'mongoose';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import * as bcrypt from 'bcrypt';
import mongoose = require('mongoose');

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    try {
      const hasUser: UserDocument = await this.userModel.findOne({ username: createUserDto.username })
      if (hasUser) throw new BadRequestException(`Username: ${createUserDto.username} already exists!`);
      const user = new this.userModel(createUserDto);
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(user.password, salt);
      user.password = hashedPassword;

      return await user.save();
    } catch (error) {
      throw error
    }
  }

  async findAll(): Promise<UserDocument[]> {
    try {
      const users = await this.userModel.find();
      if (!users.length) throw new NotFoundException(`No Users found!`);
      return users;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<UserDocument> {
    try {
      if(!this.validateObjectId(id)) throw new BadRequestException(`Invalid ObjectId sent!`);
      const userFound = await this.userModel.findById(id);
      if (!userFound) throw new NotFoundException(`User not found!`);
      return userFound;
    } catch (error) {
      throw error;
    }
  }

  async findByUsername(username: string): Promise<UserDocument> {
    try {
      const user = await this.userModel.findOne({ username }).exec();
      if (!user) throw new NotFoundException(`User not found!`)
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateOne(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {

    try {
      if(!this.validateObjectId(id)) throw new BadRequestException(`Invalid ObjectId sent!`);
      const userFound = await this.userModel.findById(id);
      if (!userFound) throw new NotFoundException(`User not found to update!`);
      return await this.userModel.findByIdAndUpdate(
        { _id: id },
        { $set: updateUserDto },
        { new: true },
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteOne(id: string): Promise<any> {
    try {
      if(!this.validateObjectId(id)) throw new BadRequestException(`Invalid ObjectId sent!`);
      const userFound = await this.userModel.findById(id);
      if (!userFound) throw new NotFoundException(`User not found to be deleted!`);
      return await this.userModel.deleteOne({ _id: id }).exec();
    } catch (error) {
      throw error;
    }
  }

  validateObjectId(id: string) {
    return mongoose.Types.ObjectId.isValid(id);
  }
}
