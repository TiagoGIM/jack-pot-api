import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TicketDto } from './dto/get-ticket.dto';

@Injectable()
export class TicketService {
  private readonly tickets :TicketDto[] = [
    { id: '1', numbers: [1, 2, 3, 4, 5, 6,7, 8], length: 8, status: 'active' },
    { id: '2', numbers: [ 1, 2, 3, 4, 5, 6,7, 8,9 ], length: 9, status: 'active' },
    // Add more ticket data as needed
  ];
  create(createTicketDto: CreateTicketDto) {
    return 'This action adds a new ticket';
  }

  findAll() :TicketDto[] {
    return this.tickets;
  }

  findOne(id: number) {
    return `This action returns a #${id} ticket`;
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
