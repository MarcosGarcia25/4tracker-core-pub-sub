import { NextFunction, Response, Request } from 'express';
import { SecurityProvider } from '../providers/SecurityProvider';
import { UserSecurity } from '../security/UserSecurity.interface';
import { ErrorCode } from '../shared/enum/ErrorCode.enum';
import { HttpStatus } from '../shared/enum/HttpStatus.enum';
import { DateUtilService } from '../shared/utils/date-util.service';

export class PermissionMiddleware {
  static async jwtDecode(request: Request, response: Response, next: NextFunction): Promise<any> {
    const securityProvider = new SecurityProvider();

    const token = request.headers.authorization;

    const date = new DateUtilService();

    if (token) {
      const data = await securityProvider.jwtDecode(token);
      const expired = date.createDate().isAfter(date.unixToDate(data?.payload['exp']));

      if (expired) {
        return response.status(HttpStatus.UNAUTHORIZED).json({
          code: ErrorCode.AUTHENTICATION_UNAUTHORIZED,
          message: 'Token inválido',
        });
      }

      request.state = {
        currentUser: data?.payload['payload'],
      };
    }

    return await next();
  }

  static async isAuthenticated(request: Request, response: Response, next: NextFunction): Promise<any> {
    const userLogged: UserSecurity = request?.state?.currentUser;

    if (userLogged) return await next();
    else
      return response.status(HttpStatus.UNAUTHORIZED).json({
        code: ErrorCode.AUTHENTICATION_UNAUTHORIZED,
        message: 'Não autenticado',
      });
  }
}
