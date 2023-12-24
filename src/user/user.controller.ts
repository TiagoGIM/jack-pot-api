import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
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
    findAll()  {
      return this.userService.findAll();
    }

    @Get('/ping')
    @UseGuards(JwtAuthGuard)
      pending() {
        return {'message' :'ok'}
    }

    @Post('/create')
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
      }

    @Post('/update-role')
    @Roles(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RoleGuard)
    updateRole(@Body() updateRole : UpdateUserRoleDto){
      return this.userService.addRoleToUser(updateRole)
    }

    @Post('/update-signature')
    @Roles(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RoleGuard)
    updateSignature(@Body() updateSignature : UpdateUserStatus){
      return this.userService.updateStatusUser(updateSignature)
    }
    
}
