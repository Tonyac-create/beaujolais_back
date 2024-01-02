import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    try {
      const createdUser = new this.userModel(createUserDto)
      return await createdUser.save()
    } catch (error) {
      
    }
  }

  async findOne(id: string): Promise<UserDocument> {
    try {
      return await this.userModel.findById(id)
    } catch (error) {
      
    }
  }

  async findByUserName(nickname: string): Promise<UserDocument> {
    try {
      return await this.userModel.findOne({ nickname })
    } catch (error) {
      
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
    try {
      return await this.userModel.findByIdAndUpdate(id, updateUserDto, {new: true})
    } catch (error) {
      
    }
  }

  async remove(id: string): Promise<any> {
    try {
      return await this.userModel.findByIdAndDelete(id)
    } catch (error) {
      
    }
  }
}
