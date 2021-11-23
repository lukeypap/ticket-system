import { IsNumber, IsString } from 'class-validator';

export class TicketDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsString()
  message: string;
}
