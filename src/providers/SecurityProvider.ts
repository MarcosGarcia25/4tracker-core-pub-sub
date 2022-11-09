import { JWT_CONFIG, SECRET_PRIVATE_KEY } from '../security/security.constant';
import jwt, { Jwt } from 'jsonwebtoken';

export class SecurityProvider {
  async jwtSign(payload: any, expiresIn?: string): Promise<string> {
    if (expiresIn) {
      JWT_CONFIG.expiresIn = expiresIn;
    }
    return await jwt.sign({ payload }, SECRET_PRIVATE_KEY, JWT_CONFIG);
  }

  async jwtDecode(token: string): Promise<null | Jwt> {
    return await jwt.decode(token.substring(7), { complete: true, json: true });
  }
}
