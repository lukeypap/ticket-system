import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserEntity } from 'src/user/entity/user.entity';
import { TicketEntity } from '../entity/ticket.entity';

export class CommentDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsArray()
  @IsOptional()
  ticket: TicketEntity;

  @IsArray()
  @IsOptional()
  user: UserEntity;
}
