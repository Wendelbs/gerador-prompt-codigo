import jwt from 'jsonwebtoken';
import { TokenPair, TokenPort } from '../../application/ports/token.port';

export class JwtTokenAdapter implements TokenPort {
  constructor(
    private readonly accessSecret: string,
    private readonly refreshSecret: string,
  ) {}

  generate(userId: string, email: string): TokenPair {
    const accessToken = jwt.sign({ sub: userId, email }, this.accessSecret, {
      expiresIn: '15m',
    });

    const refreshToken = jwt.sign({ sub: userId, email }, this.refreshSecret, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }
}
