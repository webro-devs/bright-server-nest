import { Admin } from '../../admin/admin.entity';

interface ILogin {
  accessTokenCookie: string;
  refreshTokenCookie: string;
  user: Admin;
}

export default ILogin;
