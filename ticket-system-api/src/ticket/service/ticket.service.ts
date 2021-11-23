import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  findOne(id: number) {
    return id;
  }
}
