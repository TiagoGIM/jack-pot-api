import { Injectable } from '@nestjs/common';
import { CreateUserDto, Role, UpdateUserRoleDto } from './user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

export const roundsOfHashing = 10;
@Injectable()
export class UsersService {
  findByemail(email: string) {
    return this.prisma.user.findFirst({
      where:{
        login: email
      }
    })
  }

  constructor(private prisma: PrismaService) {}

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
        name: createUserDto.name,
        roles:[ createUserDto.role ?? Role.User ]
      }
    });
  }

  async findOne(id: string) {
    return this.prisma.user.findFirst({
      where:{
        id
      }
    })
  }

  async findAll() { 
    const users = await this.prisma.user.findMany();
    return users.map(user => {
      return { email : user.login}
    })
  }

  async addRoleToUser(updateRole :UpdateUserRoleDto) {
    return this.prisma.user.update({
      where: { login : updateRole.email },
      data: { roles: { push: updateRole.role } },
    });
  }
}
