import bcrypt from 'bcryptjs';
import { HashPort } from '../../application/ports/hash.port';

export class BcryptHashAdapter implements HashPort {
  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, 10);
  }

  async compare(raw: string, hash: string): Promise<boolean> {
    return bcrypt.compare(raw, hash);
  }
}
