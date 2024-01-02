import {  HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/createUser.dto';


@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>
    ) { }

    // Création d'un account user
    async register(user: CreateUserDto): Promise<User> {
        try {
            return await this.userModel.create(user)
        } catch (error) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
        }
    }

    // Récupérer un user
    async getUser(nickname: string): Promise<User> {
        try {
            const userNickname = nickname.toLowerCase()
            const user = await this.userModel.findOne({ nickname })
            return user
        } catch (error) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
        }
    }

}
