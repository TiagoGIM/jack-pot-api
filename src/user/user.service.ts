import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserRoleDto, UpdateUserStatus } from './user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Signature } from 'src/enum/auth.enum';


export const roundsOfHashing = 10;
@Injectable()
export class UsersService {
  
  constructor(private prisma: PrismaService) { }
  
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
      );
    createUserDto.password = hashedPassword;


    try {
      
      const userCreated = await this.prisma.user.create({
        data: {
          login: createUserDto.email,
          password: createUserDto.password,
          name: createUserDto.name
        }
      });
  
    } catch (error) {
      console.log(error)
    }

    
    return {message : 'created'}
  }
  
  async findOne(id: string) {
    return this.prisma.user.findFirst({
      where: {
        id
      }
    })
  }
  
  findByemail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        login: email
      }
    })
  }
  async findAll()  {
    const users = await this.prisma.user.findMany({
      distinct: ['roles']
    });
    // console.log(users)


    return users.map(user => {
      return {
        email: user.login, 
        signature: user.signature,
      }
    })
  }
  
  async addRoleToUser(updateRole: UpdateUserRoleDto) {
    return this.prisma.user.update({
      where: { login: updateRole.email },
      data: { roles: { push: updateRole.role } },
    });
  }

  async updateStatusUser(updateStatus: UpdateUserStatus) {
    const user = this.findByemail(updateStatus.email)

    if(!user) throw new NotFoundException('Email not found')

    return this.prisma.user.update({
      where: { login: updateStatus.email },
      data: { signature: Signature.APROVED }
    })
  }
}
