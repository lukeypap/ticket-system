import { UserEntity } from './../../user/entity/user.entity';
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

  @IsOptional()
  asignee?: UserEntity;

  @IsArray()
  @IsOptional()
  comments: CommentEntity[];
}
