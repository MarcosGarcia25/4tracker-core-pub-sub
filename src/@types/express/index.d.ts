import { UserSecurity } from '../../security/UserSecurity.interface';

declare global {
  namespace Express {
    interface Request {
      state: {
        currentUser: UserSecurity;
      };
    }
  }
}
