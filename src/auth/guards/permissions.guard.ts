import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredPermissions) {
      return true;
    }
    
    const { user } = context.switchToHttp().getRequest();
    
    // SUPER_ADMIN overrides all module permission checks
    if (user?.role === 'SUPER_ADMIN') {
      return true;
    }

    if (!user || !user.permissions) {
      throw new ForbiddenException('Access denied');
    }
    
    const hasPermission = requiredPermissions.some((permission) => 
      user.permissions.includes(permission)
    );
    
    if (!hasPermission) {
      throw new ForbiddenException('Insufficient module permissions');
    }
    
    return true;
  }
}
