import { ForbiddenError, subject } from '@casl/ability';
import { Injectable, CanActivate, ExecutionContext, applyDecorators, SetMetadata, UseGuards, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AbilityRule } from 'src/casl/abilities.decorator';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { UserRole } from 'src/users/user.model';

@Injectable()
export class AbilitiesGuard implements CanActivate {
    constructor(private reflector: Reflector, private readonly caslAbilityFactory: CaslAbilityFactory) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
      const requiredPermissions = this.reflector.getAllAndOverride<AbilityRule[]>('abilities', [
        context.getHandler(),
        context.getClass()]);
        if(!requiredPermissions){
          return true;
        }
      
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      const caslAbilityFactory = this.caslAbilityFactory.createForUser(user);
      try {
        requiredPermissions.forEach(requiredPermission => ForbiddenError.from(caslAbilityFactory)
            .throwUnlessCan(requiredPermission.action, requiredPermission.subject));
            return true;    
      } catch (error) {
          if(error instanceof ForbiddenException){
              throw new ForbiddenException(error.message)
        }
    }
  } 
}