import { Exclude } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Role } from '../entity/role.enum';

export class UserUpdateDto {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  department: string;

  @IsString()
  @IsOptional()
  mobile: string;

  @IsEnum(Role)
  @IsOptional()
  role: Role;
}
