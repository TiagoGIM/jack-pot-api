import { Body, Controller, Get, HttpCode, HttpStatus, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto, UpdateUserRoleDto, UpdateUserStatus, User } from './user.dto';
import { Roles } from 'src/auth/role.decorator';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Role } from 'src/enum/auth.enum';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UsersService) {}
    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll()  {
      return await this.userService.findAll();
    }

    @Get('/ping')
    @UseGuards(JwtAuthGuard)
      async pending(@Req() req) {
        const userId = req.user.id;
        const user = await this.userService.findOne(userId)
        return  {
          signatureStatus  :user.signature, 
          userName : user.name,
          phoneNumber: user.login,
          roles:user.roles
        }
    }

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
      }

    @Patch('/update-role')
    @Roles(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @HttpCode(HttpStatus.OK)
    updateRole(@Body() updateRole : UpdateUserRoleDto){
      return this.userService.addRoleToUser(updateRole)
    }

    @Post('/update-signature')
    @Roles(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @HttpCode(HttpStatus.OK)
    updateSignature(@Body() updateSignature : UpdateUserStatus){
      console.log(updateSignature)
      return this.userService.updateStatusUser(updateSignature)
    }
    
}
