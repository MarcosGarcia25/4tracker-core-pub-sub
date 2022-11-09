import { Secret, SignOptions } from 'jsonwebtoken';

export const SALT_ROUNDS = 10;
export const SECRET_PRIVATE_KEY: Secret = '4e916e55d2138ac8d2bf49fdabe36e27dc22d9e8';
export const JWT_CONFIG: SignOptions = {
  algorithm: 'HS512',
  issuer: '9f294544590a741d3888d9885d138e2154d1aae2',
  expiresIn: '1h',
};
