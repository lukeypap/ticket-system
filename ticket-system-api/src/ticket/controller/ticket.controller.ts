import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TicketDto } from '../dto/ticket.dto';
import { TicketService } from '../service/ticket.service';

@Controller('ticket')
export class TicketController {
  constructor(private readonly _ticketService: TicketService) {}

  @Get()
  async findAll(): Promise<TicketDto[]> {
    return await this._ticketService.findAll();
  }

  @Get(':id')
  findOne(@Param() id: number) {
    return this._ticketService.findOne(id);
  }

  @Post()
  create(@Body() user: TicketDto): Promise<TicketDto> {
    return this._ticketService.create(user);
  }

  @Delete(':id')
  delete(@Param() id: number) {
    return this._ticketService.delete(id);
  }
}
