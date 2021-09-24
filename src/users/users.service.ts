import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const user = new this.userModel(createUserDto);
    return await user.save();
  }

  async findAll(): Promise<UserDocument[]> {
    return await this.userModel.find();
  }

  async findOne(id: string): Promise<UserDocument> {
    return await this.userModel.findById(id);
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
