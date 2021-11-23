import { Inject, Injectable } from '@nestjs/common';
import { TicketDto } from 'src/ticket/dto/ticket.dto';
import { Repository } from 'typeorm';
import { TicketEntity } from '../entity/ticket.entity';

@Injectable()
export class TicketService {
  constructor(
    @Inject('TICKET_REPOSITORY')
    private ticketRepo: Repository<TicketEntity>,
  ) {}

  create(user: TicketDto): Promise<TicketDto> {
    return this.ticketRepo.save(user);
  }

  findAll(): Promise<TicketDto[]> {
    return this.ticketRepo.find();
  }

  findOne(id: number): Promise<TicketDto> {
    return this.ticketRepo.findOne(id);
  }

  async delete(id: number): Promise<TicketDto> {
    const ticket = await this.ticketRepo.findOne(id);
    await this.ticketRepo.delete(id);
    return ticket;
  }
}
