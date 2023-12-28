import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { BetService } from './bet.service';
import { betCreateDto } from './bet.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('bet')
export class BetController {

    constructor(private betService: BetService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getUserBets(@Req() req) {
        const userId = req.user.id;
        return await this.betService.userBets(userId);
    }


    @Patch()
    @UseGuards(JwtAuthGuard)
    async createBet(@Req() req, @Body() bet: betCreateDto) {
        const userId = req.user.id;
        return await this.betService.editBet(userId, bet)
    }

    @Get('/odd')
    @UseGuards(JwtAuthGuard)
    async oods(){
        return await this.betService.mostPickedByUsers();
    }
}