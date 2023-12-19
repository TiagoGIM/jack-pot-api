/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UsersModule } from './user/user.module';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController, AuthController, UserController],
  providers: [AppService, AuthService, UsersService],
})
export class AppModule {}
