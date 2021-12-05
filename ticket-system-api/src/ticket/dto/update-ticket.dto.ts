import { IsArray, IsOptional } from 'class-validator';
import { CommentEntity } from '../entity/comment.entity';

export class UpdateTicketDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  message?: string;

  @IsOptional()
  status?: string;

  @IsOptional()
  isOpen?: boolean;

  @IsArray()
  @IsOptional()
  comments: CommentEntity[];
}
