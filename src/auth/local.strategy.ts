import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super()
    }

    async validate(nickname: string, password: string): Promise<User> {
        try {
            const usernickname = nickname.toLowerCase()
            const user = await this.authService.validateUser(nickname, password)
            if (!user) throw new UnauthorizedException()
            return user || null
        } catch (error) {
            throw new UnauthorizedException('Invalid credentials');
        }
    }
}