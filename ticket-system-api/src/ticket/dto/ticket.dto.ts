import { IsArray, IsOptional, IsString } from 'class-validator';
import { UserEntity } from 'src/user/entity/user.entity';
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
  user: UserEntity;

  @IsString()
  @IsOptional()
  asignee: UserEntity;

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
