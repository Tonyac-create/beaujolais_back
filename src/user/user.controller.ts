import { Body, Controller, Get, HttpException, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dtos/createUser.dto';
import * as bcrypt from 'bcrypt'
import { LocalAuthGuard } from 'src/auth/local.auth.guard';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Post('/signup')
    async register(
        @Body() user: CreateUserDto
    ): Promise<User> {
        try {   
            const saltOrRounds = 10
            const hashPassword = await bcrypt.hash(user.password, saltOrRounds)   
            user.password = hashPassword
            return await this.userService.register(user)
        } catch (error) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
        }
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(
        @Request() req: any 
    ): Promise<any> {
        try {
            return { User: req.user, msg: 'User logged in'}
        } catch (error) {
            
        }
    }
    
}
