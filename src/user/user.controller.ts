import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dtos/createUser.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Post()
    async register(
        @Body() user: CreateUserDto
    ): Promise<User> {
        try {            
            return await this.userService.register(user)
        } catch (error) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
        }
    }

    
}
