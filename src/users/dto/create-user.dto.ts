import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {

    @IsString()
    nickname: string

    @IsString()
    email: string

    @IsString()
    password: string

    refreshToken?: string

}
