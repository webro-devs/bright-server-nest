import { SetMetadata } from '@nestjs/common';

import { PermissionEnum } from '../../../infra/shared/enums';

export const PERMISSIONS_KEY = 'PERMISSIONS_KEY';
export const PermissionsGuard = (...permissions: PermissionEnum[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
