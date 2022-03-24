import { SetMetadata } from '@nestjs/common';
import { UserRole } from './user.model';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);