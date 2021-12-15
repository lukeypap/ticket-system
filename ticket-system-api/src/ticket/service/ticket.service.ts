import { Inject, Injectable } from '@nestjs/common';
import { TicketDto } from 'src/ticket/dto/ticket.dto';
import { UpdateTicketDto } from '../dto/update-ticket.dto';
import { Repository } from 'typeorm';
import { TicketEntity } from '../entity/ticket.entity';
import { plainToInstance } from 'class-transformer';
import { CommentEntity } from '../entity/comment.entity';
import { CommentDto } from '../dto/comment.dto';
import { UserEntity } from 'src/user/entity/user.entity';

@Injectable()
export class TicketService {
  constructor(
    @Inject('TICKET_REPOSITORY')
    private readonly _ticketRepo: Repository<TicketEntity>,
    @Inject('COMMENT_REPOSITORY')
    private readonly _commentRepo: Repository<CommentEntity>,
    @Inject('USER_REPOSITORY')
    private readonly _userRepo: Repository<UserEntity>,
  ) {}

  async create(ticket: TicketDto, authUser: any): Promise<TicketDto> {
    const user = await this._userRepo.findOne(authUser.id);
    ticket.user = user;
    const ticketDto = plainToInstance(
      TicketDto,
      await this._ticketRepo.save(ticket),
    );
    return ticketDto;
  }

  async createComment(
    comment: CommentDto,
    id: number,
    authUser: any,
  ): Promise<TicketDto> {
    const ticket = await this._ticketRepo.findOne(id);
    const user = await this._userRepo.findOne(authUser.id);
    comment.ticket = ticket;
    comment.user = user;
    await this._commentRepo.save(comment);
    return await this._ticketRepo.findOne(id, {
      relations: ['comments', 'comments.user'],
    });
  }

  async findAll(): Promise<TicketDto[]> {
    const ticketDto = plainToInstance(
      TicketDto,
      await this._ticketRepo.find({
        order: {
          createdAt: 'DESC',
        },
        relations: ['comments', 'comments.user', 'user'],
      }),
    );
    return ticketDto;
  }

  async findOne(id: number): Promise<TicketDto> {
    const ticketDto = plainToInstance(
      TicketDto,
      await this._ticketRepo.findOne(id, {
        relations: ['comments', 'comments.user'],
      }),
    );
    return ticketDto;
  }

  async update(id: number, ticket: UpdateTicketDto): Promise<TicketDto> {
    await this._ticketRepo.update(id, ticket);
    const ticketDto = plainToInstance(
      TicketDto,
      await this._ticketRepo.findOne(id, {
        relations: ['comments', 'comments.user'],
      }),
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
      await this._ticketRepo.find({
        where: { isOpen: true },
        relations: ['comments', 'comments.user'],
      }),
    );
    return ticketDto;
  }

  async findClosed(): Promise<TicketDto[]> {
    const ticketDto = plainToInstance(
      TicketDto,
      await this._ticketRepo.find({
        where: { isOpen: false },
        relations: ['comments', 'comments.user'],
      }),
    );
    return ticketDto;
  }
}
