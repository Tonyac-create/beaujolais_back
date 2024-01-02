import { HttpException, HttpStatus, Injectable, NotAcceptableException } from "@nestjs/common";
import { User } from "src/user/schemas/user.schema";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async validateUser(nickname: string, password: string): Promise<User> {
        try {
            const user = await this.userService.getUser(nickname)
            if (!user) throw new NotAcceptableException('Could not find the user')

            const passwordValid = await bcrypt.compare(password, user.password)
            if (!passwordValid) throw new NotAcceptableException('Could not find the user')
            return user
        } catch (error) {
            throw new NotAcceptableException('Could not find the user')
        }
    }
}