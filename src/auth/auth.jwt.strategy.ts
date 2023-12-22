import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from 'src/user/user.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtSecret } from './auth.module';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: { email: string , userId : string}) {

    const user = await this.usersService.findOne(payload.email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}
