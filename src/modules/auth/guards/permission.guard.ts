import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { PermissionEnum } from '../../../infra/shared/enums';
import { Admin } from '../../admin/admin.entity';
import { PERMISSIONS_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<
      PermissionEnum[]
    >(PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredPermissions) {
      return true;
    }
    const { user }: { user: Admin } = context.switchToHttp().getRequest();
    let isPermitted = false;
    const adminPermission = user.permissions || [];
    for (let i = 0; i < requiredPermissions.length; i++) {
      if (adminPermission.find((ap) => ap.title == requiredPermissions[i])) {
        isPermitted = true;
      } else {
        isPermitted = false;
        break;
      }
    }
    return isPermitted;
  }
}
