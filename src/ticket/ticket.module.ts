import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { UsersModule } from 'src/user/user.module';

@Module({
  imports:[UsersModule],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
