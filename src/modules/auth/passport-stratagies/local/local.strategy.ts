import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../../auth.service';
import { AdminService } from '../../../admin/admin.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private readonly adminService: AdminService,
  ) {
    super({ usernameField: 'login' });
  }

  async validate(login: string, password: string) {
    const user = await this.authService.validateUserByEmailPassword(
      login,
      password,
    );
    return user;
  }
}
