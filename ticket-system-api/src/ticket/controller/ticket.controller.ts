import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { CommentDto } from '../dto/comment.dto';
import { TicketDto } from '../dto/ticket.dto';
import { UpdateTicketDto } from '../dto/update-ticket.dto';
import { TicketService } from '../service/ticket.service';

@Controller('ticket')
@UseGuards(JwtGuard)
export class TicketController {
  constructor(private readonly _ticketService: TicketService) {}

  @Get()
  async findAll(@Req() req: any): Promise<any> {
    const tickets = await this._ticketService.findAll();
    const user = req.user;
    return { tickets, user };
  }

  @Get(':id')
  async findOne(@Req() req: any, @Param() id: number): Promise<any> {
    const ticket = await this._ticketService.findOne(id);
    const user = req.user;
    return { ticket, user };
  }

  @Get('status/:status')
  findOpen(@Param('status') status: string) {
    if (status === 'open') return this._ticketService.findOpen();
    else if (status === 'closed') return this._ticketService.findClosed();
  }

  @Post()
  create(@Body() ticket: TicketDto, @Req() req: any): Promise<TicketDto> {
    const user = req.user;
    return this._ticketService.create(ticket, user);
  }

  @Post(':id/comment')
  createComment(
    @Body() comment: CommentDto,
    @Param('id') id: number,
    @Req() req: any,
  ): Promise<TicketDto> {
    const user = req.user;
    return this._ticketService.createComment(comment, id, user);
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
