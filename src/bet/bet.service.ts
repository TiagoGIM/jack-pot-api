import { Injectable, NotFoundException } from '@nestjs/common';
import { UUID } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { betCreateDto } from './bet.dto';


@Injectable()
export class BetService {
  constructor(private prisma: PrismaService) { }

  async userBets(userId: string) {

    const activeTickets = await this.prisma.ticket.findMany({ where: { status: 'active' } ,
   });

    const bets = await this.prisma.bet.findMany({
      where:
      {
        userId,
        ticketId: { in: activeTickets.map(ticket => ticket.id) }
      },
      orderBy: {
        updatedAt: 'desc', // Isso ordenará pela data de atualização em ordem decrescente
      },
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

  async mostPickedByUsers() {
    const allBets = await this.prisma.ticket.findMany({
      select: {
        pitacos: true,
      },
    });

    const numbersMap: Map<number, number> = new Map();


    allBets.forEach((bet) => {
      if (bet.pitacos && bet.pitacos.length > 0) {

        bet.pitacos.forEach((pitaco) => {
          pitaco.numbers.forEach((number) => {

            numbersMap.set(number, (numbersMap.get(number) || 0) + 1);
          });
        });
      }
    });


    const mostPickeds: { number: number; quantity: number }[] = [];
    numbersMap.forEach((quantity, number) => {
      mostPickeds.push({ number, quantity });
    });

    return mostPickeds;
  }
}
