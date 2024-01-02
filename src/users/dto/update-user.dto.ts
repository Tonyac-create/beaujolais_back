import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// Supprime l'attribut password, ne prend en compte que le nickname et email de CreateUserDto
export class UpdateUserDto extends OmitType(CreateUserDto, ['password']) {}
