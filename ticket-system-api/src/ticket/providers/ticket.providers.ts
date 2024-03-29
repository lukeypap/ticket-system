import { UserEntity } from 'src/user/entity/user.entity';
import { Connection } from 'typeorm';
import { CommentEntity } from '../entity/comment.entity';
import { TicketEntity } from '../entity/ticket.entity';

export const ticketProviders = [
  {
    provide: 'TICKET_REPOSITORY',
    useFactory: (conneciton: Connection) =>
      conneciton.getRepository(TicketEntity),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'COMMENT_REPOSITORY',
    useFactory: (conneciton: Connection) =>
      conneciton.getRepository(CommentEntity),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'USER_REPOSITORY',
    useFactory: (conneciton: Connection) =>
      conneciton.getRepository(UserEntity),
    inject: ['DATABASE_CONNECTION'],
  },
];
