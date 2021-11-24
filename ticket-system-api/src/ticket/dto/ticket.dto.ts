import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';

export class TicketDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsString()
  message: string;

  @IsString()
  status: string;

  @IsBoolean()
  isOpen: boolean;
}
