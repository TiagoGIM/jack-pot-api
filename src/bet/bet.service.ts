import { Injectable, NotFoundException } from '@nestjs/common';
import { UUID } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { betCreateDto } from './bet.dto';


@Injectable()
export class BetService {
    constructor(private prisma: PrismaService) { }

    async userBets(userId: string) {
        const activeTickets = await this.prisma.ticket.findMany({ where: { status: 'active' } });
        const bets = await this.prisma.bet.findMany({ where: { userId } });

        for (const ticket of activeTickets) {
          console.log(ticket)
            const hasBet = bets.some((bet) => bet.ticketId === ticket.id);
            if (!hasBet) {
                const newBet = await this.prisma.bet.create({
                    data: {
                        userId,
                        ticketId: ticket.id,
                        numbers: [],
                    },
                });
                bets.push(newBet);
            }
        }
        return bets.map((bet) => ({
            ticketId: bet.ticketId,
            id: bet.id,
            numbers: bet.numbers,
            length: 8,
            status: activeTickets.find(ticket => 
                ticket.id === bet.ticketId 
            ).status,
        }));
    }

    async editBet(userId: UUID , bet : betCreateDto) {

      const betFinded = this.prisma.bet.findFirst({
        where : {
          id : bet.id
        }
      })

      if(!betFinded) throw new NotFoundException('Bet not found')
        return this.prisma.bet.update(
            {
                where: {
                    id: bet.id,
                    userId:userId
                },
                data: {
                    numbers :bet.numbers
                }
            }
        )
    }

}
