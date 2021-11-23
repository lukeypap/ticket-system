import { Connection } from 'typeorm';
import { TicketEntity } from '../entity/ticket.entity';

export const ticketProviders = [
  {
    provide: 'TICKET_REPOSITORY',
    useFactory: (conneciton: Connection) =>
      conneciton.getRepository(TicketEntity),
    inject: ['DATABASE_CONNECTION'],
  },
];
