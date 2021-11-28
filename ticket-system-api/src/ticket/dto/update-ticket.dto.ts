import { IsOptional } from 'class-validator';

export class UpdateTicketDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  message?: string;

  @IsOptional()
  status?: string;

  @IsOptional()
  isOpen?: boolean;
}
