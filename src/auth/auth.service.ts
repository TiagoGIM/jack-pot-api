import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(phoneNumber: string, password: any) {
    const user = await this.usersService.findByphoneNumber(phoneNumber);

    if(!user) throw new UnauthorizedException('User not found');
    
    const isPasswordValid = await bcrypt.compare(password, user?.password);
   
    if ( !isPasswordValid) {
      throw new UnauthorizedException('Senha Inválida');
    }

    const payload = { userId: user.id, phoneNumber: user.login };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      login:phoneNumber,
      signatureStatus: user.signature,
      userName: user.name,
      role: user.roles
    };
  }
}
