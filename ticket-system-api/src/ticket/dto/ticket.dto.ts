import { IsArray, IsOptional, IsString } from 'class-validator';
import { CommentEntity } from '../entity/comment.entity';

export class TicketDto {
  @IsString()
  @IsOptional()
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

  @IsString()
  @IsOptional()
  priority: string;

  @IsArray()
  @IsOptional()
  comments: CommentEntity[];
}
