import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissaoInsuficienteException } from 'src/excpetions/PermissaoInsuficienteException';
import { UsersService } from 'src/user/user.service';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector, private userService: UsersService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const roles = this.reflector.get<string[]>('roles', context.getHandler());
      console.log( roles)
      if (!roles) {
        return true;
      }
  
      const request = context.switchToHttp().getRequest();
      const userId = request.user?.id;

      console.log(userId)
      
      if (!userId) {
        return false;
      }
  
      const user = await this.userService.findOne(userId);

  
      if (!user || !user.roles || !this.matchRoles(roles, user.roles )) {
         throw new PermissaoInsuficienteException() 
      }
  
      return true;
    }
    private matchRoles(roles: string[], userRoles: string[]): boolean {
        return roles.some((role) => userRoles.includes(role));
      }
  }