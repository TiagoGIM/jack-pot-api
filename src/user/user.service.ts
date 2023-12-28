import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserRoleDto, UpdateUserStatus } from './user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Signature } from 'src/enum/auth.enum';
import { ConflictException } from '@nestjs/common';


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
      console.log(createUserDto)

    try {
      await this.prisma.user.create({
        data: {
          login: createUserDto.phoneNumber,
          password: createUserDto.password,
          name: createUserDto.name
        }
      });

      return { message: 'created' };
  
    } catch (error) {
      
      this.handlePrismaError(error);
  }
}
  
  async findOne(id: string) {
    return this.prisma.user.findFirst({
      where: {
        id
      }
    })
  }
  
  findByphoneNumber(phoneNumber: string) {
    return this.prisma.user.findFirst({
      where: {
        login: phoneNumber
      }
    })
  }
  async findAll()  {
    const users = await this.prisma.user.findMany({
      distinct: ['roles']
    });

    return users.map(user => {
      return {
        phoneNumber: user.login, 
        signatureStatus: user.signature,
        name: user.name
      }
    })
  }
  
  async addRoleToUser(updateRole: UpdateUserRoleDto) {
    return this.prisma.user.update({
      where: { login: updateRole.phoneNumber },
      data: { roles: { push: updateRole.role } },
    });
  }

  async updateStatusUser(updateStatus: UpdateUserStatus) {
    console.log(updateStatus.phoneNumber)
    const user = await this.findByphoneNumber(updateStatus.phoneNumber)

    if(!user) throw new NotFoundException('Usuário Não encontrado')

    const updateduser = await this.prisma.user.update({
      where: { login: updateStatus?.phoneNumber },
      data: { signature: Signature.APROVED }
    })
    return {
      signatureStatus : user.signature,
      name : user.name,
      phoneNumber  : user.login
    }
  }

  private handlePrismaError(error: any) {
    
    if (error.code === 'P2002' && error.meta?.target?.includes('login')) {
      throw new ConflictException('O número de telefone já está em uso.');
    }
    if(error.message.includes('Argument `login` is missing')){
      throw new BadRequestException('Argument `login` is missing')
    }

    throw new Error('Erro ao interagir com o banco de dados.');
  }
  
}
