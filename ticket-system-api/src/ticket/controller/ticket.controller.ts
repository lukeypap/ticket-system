import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CommentDto } from '../dto/comment.dto';
import { TicketDto } from '../dto/ticket.dto';
import { UpdateTicketDto } from '../dto/update-ticket.dto';
import { CommentEntity } from '../entity/comment.entity';
import { TicketService } from '../service/ticket.service';

@Controller('ticket')
export class TicketController {
  constructor(private readonly _ticketService: TicketService) {}

  @Get()
  async findAll(): Promise<TicketDto[]> {
    return await this._ticketService.findAll();
  }

  @Get(':id')
  findOne(@Param() id: number): Promise<TicketDto> {
    return this._ticketService.findOne(id);
  }

  @Get('status/:status')
  findOpen(@Param('status') status: string) {
    if (status === 'open') return this._ticketService.findOpen();
    else if (status === 'closed') return this._ticketService.findClosed();
  }

  @Post()
  create(@Body() user: TicketDto): Promise<TicketDto> {
    return this._ticketService.create(user);
  }

  @Post(':id/comment')
  createComment(
    @Body() comment: CommentDto,
    @Param('id') id: number,
  ): Promise<TicketDto> {
    return this._ticketService.createComment(comment, id);
  }

  @Patch(':id')
  update(
    @Param() id: number,
    @Body() ticket: UpdateTicketDto,
  ): Promise<TicketDto> {
    return this._ticketService.update(id, ticket);
  }

  @Delete(':id')
  delete(@Param() id: number): Promise<TicketDto> {
    return this._ticketService.delete(id);
  }
}
