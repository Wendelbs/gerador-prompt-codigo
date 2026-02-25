import crypto from 'crypto';
import { RegisterInput } from '../dto/auth.dto';
import { HashPort } from '../ports/hash.port';
import { TokenPair, TokenPort } from '../ports/token.port';
import { User } from '../../domain/entities/user.entity';
import { Email } from '../../domain/value-objects/email.vo';
import { UserRepository } from '../../domain/repositories/user.repository';

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashPort: HashPort,
    private readonly tokenPort: TokenPort,
  ) {}

  async execute(input: RegisterInput): Promise<TokenPair> {
    const email = Email.create(input.email).getValue();
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('E-mail já cadastrado');
    }

    const passwordHash = await this.hashPort.hash(input.password);
    const user = new User(crypto.randomUUID(), input.name.trim(), email, passwordHash);
    const savedUser = await this.userRepository.save(user);
    const tokens = this.tokenPort.generate(savedUser.id, savedUser.email);

    const refreshHash = await this.hashPort.hash(tokens.refreshToken);
    await this.userRepository.updateRefreshToken(savedUser.id, refreshHash);

    return tokens;
  }
}
