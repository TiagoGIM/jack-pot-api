import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './auth.jwt.strategy';

export const jwtSecret = process.env.JWT_SECRET || jwtConstants.secret;

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtSecret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
