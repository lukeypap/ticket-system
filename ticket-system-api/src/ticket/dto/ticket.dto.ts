import { Exclude } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class TicketDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  message: string;

  @IsString()
  @IsOptional()
  user: string;

  @IsString()
  @IsOptional()
  status: string;

  @IsBoolean()
  @IsOptional()
  isOpen: boolean;
}
