import { Injectable, CanActivate, ExecutionContext, applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserRole } from 'src/users/user.model';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
      const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>('roles', [
        context.getHandler(),
        context.getClass()]);
        if(!requiredRoles){
          return true;
        }
      
      const request = context.switchToHttp().getRequest();
      const user = request.user;

      return requiredRoles.some((role) => user.userRole?.includes(role));
  } 
}