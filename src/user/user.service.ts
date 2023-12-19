import { Injectable } from '@nestjs/common';
import { CreateUserDto, User } from './user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

export const roundsOfHashing = 10;
@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) {}
  // private readonly users = [
  //   {
  //     userId: 1,
  //     email: 'john@doe.com',
  //     password: 'changeme',
  //   },
  //   {
  //     userId: 2,
  //     email: 'maria',
  //     password: 'guess',
  //   },
  // ];

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    );
    createUserDto.password = hashedPassword;

    return this.prisma.user.create({
      data: {
        login: createUserDto.email,
        password: createUserDto.password,
      }
    });
  }

  async findOne(email: string) {
    return this.prisma.user.findFirst({
      where:{
        login: email
      }
    })
    // return this.users.find((user) => user.email === email);
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map(user => {
      return { email : user.login}
    })
  }
}
