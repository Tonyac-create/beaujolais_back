import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"


export class CreateUserDto{
    @IsNotEmpty()
    @IsString()
    nickname: string

    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsString()
    @IsOptional()
    avatar?: string
}