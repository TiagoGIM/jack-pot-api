/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketController } from './ticket/ticket.controller';
import { TicketService } from './ticket/ticket.service';
import { TicketModule } from './ticket/ticket.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UsersModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { BetService } from './bet/bet.service';
import { BetController } from './bet/bet.controller';
import { APP_FILTER } from '@nestjs/core';
import { PrismaExceptionFilter } from './excpetions/prisma-exception.filter';

@Module({
  imports: [AuthModule, UsersModule,TicketModule, PrismaModule],
  controllers: [AppController, AuthController, UserController,TicketController, BetController],
  providers: [AppService, AuthService, UsersService,TicketService, BetService,
    {
      provide: APP_FILTER,
      useClass: PrismaExceptionFilter,
    },],
})
export class AppModule {}
