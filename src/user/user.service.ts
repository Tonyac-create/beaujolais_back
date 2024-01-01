import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/createUser.dto';


@Controller('user')
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>
    ) { }

    // Création d'un account user
    async register(user: CreateUserDto): Promise<User> {
        try {
            return await this.userModel.create(user)
        } catch (error) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
        }
    }

    // Connexion de l'utilisateur
    // async login(user: User): Promise<any> {
    //     try {
    //         return await this.userModel.find({email, password})
    //     } catch (error) {
            
    //     }
    // }
}
