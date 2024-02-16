import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/index';

export const HasRoles = (...roles: Role[]) => SetMetadata('roles', roles);