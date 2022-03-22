import { Injectable, CanActivate, ExecutionContext, applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
      console.log('calling from roles guard...');
      const roles = this.reflector.get<string[]>('roles', context.getHandler());
      console.log(roles);
      if(!roles){
          return false;
      }
      
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      if(user.userRole === 'admin' || user.userRole === 'superadmin'){
        console.log(user);  
        return true;
      }
    //   return verifyRoles(roles, user.roles);
    // if(user.Roles.admin){
    //     console.log(user.Roles);
    // }
  } 
}

export function Roles(...roles: string[]){
    return applyDecorators(
        SetMetadata('roles', roles),
        UseGuards(RolesGuard),
    );
}
