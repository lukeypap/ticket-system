import { TicketEntity } from 'src/ticket/entity/ticket.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { createConnection } from 'typeorm';

export const databaseProvider = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'ticket_system_db',
        entities: [TicketEntity, UserEntity],
        synchronize: true,
      }),
  },
];
