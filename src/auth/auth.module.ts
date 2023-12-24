import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './auth.jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './role.guard';
dotenv.config();

export const jwtSecret = process.env.JWT_SECRET || jwtConstants.secret;

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: jwtSecret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy,  
  //   {
  //   provide: APP_GUARD,
  //   useClass: RoleGuard,
  // },
],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
