import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Bet, TicketDto } from './dto/get-ticket.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TicketService {
  constructor(private prisma: PrismaService) { }

  create(createTicketDto: CreateTicketDto) {
    return  this.prisma.ticket.create({
      data : {
        ...createTicketDto
      }
    });
  }

  findAll() {
    return this.prisma.ticket.findMany();
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
