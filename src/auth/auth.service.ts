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

  async signIn(email: string, password: any) {
    const user = await this.usersService.findByemail(email);

    if(!user) throw new UnauthorizedException('User not found');
    
    const isPasswordValid = await bcrypt.compare(password, user?.password);
   
    if ( !isPasswordValid) {
      throw new UnauthorizedException();
    }

    const payload = { userId: user.id, email: user.login };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      login:email,
      signatureStatus: user.signature,
      userName: user.name,
      role: user.roles
    };
  }
}
