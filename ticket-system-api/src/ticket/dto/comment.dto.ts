import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TicketEntity } from '../entity/ticket.entity';

export class CommentDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsArray()
  @IsOptional()
  ticket: TicketEntity;
}
