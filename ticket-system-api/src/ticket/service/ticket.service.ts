import { Inject, Injectable } from '@nestjs/common';
import { TicketDto } from 'src/ticket/dto/ticket.dto';
import { UpdateTicketDto } from '../dto/update-ticket.dto';
import { Repository } from 'typeorm';
import { TicketEntity } from '../entity/ticket.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TicketService {
  constructor(
    @Inject('TICKET_REPOSITORY')
    private readonly _ticketRepo: Repository<TicketEntity>,
  ) {}

  async create(user: TicketDto): Promise<TicketDto> {
    const ticketDto = plainToInstance(
      TicketDto,
      await this._ticketRepo.save(user),
    );
    return ticketDto;
  }

  async findAll(): Promise<TicketDto[]> {
    const ticketDto = plainToInstance(TicketDto, await this._ticketRepo.find());
    return ticketDto;
  }

  async findOne(id: number): Promise<TicketDto> {
    const ticketDto = plainToInstance(
      TicketDto,
      await this._ticketRepo.findOne(id),
    );
    return ticketDto;
  }

  async update(id: number, ticket: UpdateTicketDto): Promise<TicketDto> {
    await this._ticketRepo.update(id, ticket);
    const ticketDto = plainToInstance(
      TicketDto,
      await this._ticketRepo.findOne(id),
    );
    return ticketDto;
  }

  async delete(id: number): Promise<TicketDto> {
    const ticketDto = plainToInstance(
      TicketDto,
      await this._ticketRepo.findOne(id),
    );
    await this._ticketRepo.delete(id);
    return ticketDto;
  }

  async findOpen(): Promise<TicketDto[]> {
    const ticketDto = plainToInstance(
      TicketDto,
      await this._ticketRepo.find({ where: { isOpen: true } }),
    );
    return ticketDto;
  }

  async findClosed(): Promise<TicketDto[]> {
    const ticketDto = plainToInstance(
      TicketDto,
      await this._ticketRepo.find({ where: { isOpen: false } }),
    );
    return ticketDto;
  }
}
