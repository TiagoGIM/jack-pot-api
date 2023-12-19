import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Bet, TicketDto } from './dto/get-ticket.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TicketService {
  constructor(private prisma: PrismaService) { }
  private readonly tickets: TicketDto[] = [
    { id: '1', numbers: [1, 2, 3, 4, 5, 6, 7, 8], length: 8, status: 'active' },
    {
      id: '2',
      numbers: [],
      length: 9,
      status: 'active',
    },
    {
      id: '3',
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      length: 9,
      status: 'ended',
    },
    // Add more ticket data as needed
  ];
  create(createTicketDto: CreateTicketDto) {
    return  this.prisma.ticket.create({
      data : {
        ...createTicketDto
      }
    });
  }

  findAll(): TicketDto[] {
    
    // 
    // ticketRepository.findAll()
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

  updateBet( bet : Bet) : Bet {
    return bet
  }
}
