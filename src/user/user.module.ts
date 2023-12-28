import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { PrismaModule } from 'nestjs-prisma/dist/prisma.module';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports:[PrismaModule]
})
export class UsersModule {}
