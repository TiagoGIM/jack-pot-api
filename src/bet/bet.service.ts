import { Injectable, NotFoundException } from '@nestjs/common';
import { UUID } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { betCreateDto } from './bet.dto';


@Injectable()
export class BetService {
  constructor(private prisma: PrismaService) { }

  async userBets(userId: string) {

    const activeTickets = await this.prisma.ticket.findMany({ where: { status: 'active' } });

    const bets = await this.prisma.bet.findMany({
      where:
      {
        userId,
        ticketId: { in: activeTickets.map(ticket => ticket.id) }
      }
    });


    const ticketsWithoutBet = activeTickets.filter(ticket => !bets.some(bet => bet.ticketId === ticket.id));

    const newBets = await Promise.all(
      ticketsWithoutBet.map(async ticket => {
        const newBet = await this.prisma.bet.create({
          data: {
            userId,
            ticketId: ticket.id,
            numbers: [],
          },
        });
        return newBet;
      })
    );

    const allBets = [...bets, ...newBets];

    const formattedBets = allBets.map(bet => ({
      ticketId: bet.ticketId,
      id: bet.id,
      numbers: bet.numbers,
      length: activeTickets.find(t => t.id === bet.ticketId)?.length || 6,
      status: activeTickets.find(t => t.id === bet.ticketId)?.status || 'active',
    }));

    return formattedBets;
  }

  async editBet(userId: UUID, bet: betCreateDto) {
    const betFinded = this.prisma.bet.findFirst({ where: { id: bet.id } })

    if (!betFinded) throw new NotFoundException('Bet not found')
    return this.prisma.bet.update({
      where: {
        id: bet.id,
        userId: userId
      },
      data: {
        numbers: bet.numbers
      }
    })
  }
}
