import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as argon2 from 'argon2';
import { Types } from 'mongoose';
import { UserDocument } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) { }

    async signUp(createUserDto: CreateUserDto)
        : Promise<{ tokens: { accessToken: string, refreshToken: string }, user: Omit<UserDocument, 'password'> }> {
        const userExist = await this.userService.findByUserName(createUserDto.nickname)
        if (userExist) throw new BadRequestException('User already exist')

        // Hash password
        const hash = await argon2.hash(createUserDto.password)
        const newUser = await this.userService.create({
            ...createUserDto,
            password: hash
        })

        const tokens = await this.__getTokens(newUser._id, newUser.nickname)

        await this.__updateRefreshToken(newUser._id, tokens.refreshToken)

        const user = JSON.parse(JSON.stringify(newUser))
        delete user.password
        return {
            tokens,
            user
        }
    }

    /**
     * PRIVATE METHOD
     */

    private async __getTokens(id: Types.ObjectId, nickname: string): Promise<{ accessToken: string, refreshToken: string }> {
        // Version plus propre
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({ sub: id, nickname }, { expiresIn: '15m', secret: process.env.JWT_SECRET_TOKEN }),
            this.jwtService.signAsync({ sub: id, nickname }, { expiresIn: '7d', secret: process.env.JWT_SECRET_TOKEN })
        ])

        // Autre manière de faire, corect aussi
        // const accessToken = this.jwtService.signAsync({sub: id, nickname}, {expiresIn: '15m'})
        // const refreshToken = this.jwtService.signAsync({sub: id, nickname}, {expiresIn: '7d'})

        return {
            accessToken,
            refreshToken
        }
    }

    private async __updateRefreshToken(id: Types.ObjectId, refreshToken: string): Promise<void> {
        const hashedRefreshtoken = await argon2.hash(refreshToken)
        await this.userService.updateToken(id.toString(), hashedRefreshtoken)
    }
}
