import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { TicketController } from './controller/ticket.controller';
import { ticketProviders } from './providers/ticket.providers';
import { TicketService } from './service/ticket.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TicketController],
  providers: [...ticketProviders, TicketService],
})
export class TicketModule {}
