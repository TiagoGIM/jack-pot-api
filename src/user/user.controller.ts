import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto, Role, UpdateUserRoleDto } from './user.dto';
import { Roles } from 'src/auth/role.decorator';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UsersService) {}
    @Get()
    findAll() {
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
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RoleGuard)
    updateRole(@Body() updateRole : UpdateUserRoleDto){
      return this.userService.addRoleToUser(updateRole)
    }
    
}
