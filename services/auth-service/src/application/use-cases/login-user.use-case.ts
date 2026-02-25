import { LoginInput } from '../dto/auth.dto';
import { HashPort } from '../ports/hash.port';
import { TokenPair, TokenPort } from '../ports/token.port';
import { UserRepository } from '../../domain/repositories/user.repository';
import { Email } from '../../domain/value-objects/email.vo';

export class LoginUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashPort: HashPort,
    private readonly tokenPort: TokenPort,
  ) {}

  async execute(input: LoginInput): Promise<TokenPair> {
    const email = Email.create(input.email).getValue();
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    const isValidPassword = await this.hashPort.compare(input.password, user.passwordHash);
    if (!isValidPassword) {
      throw new Error('Credenciais inválidas');
    }

    const tokens = this.tokenPort.generate(user.id, user.email);
    const refreshHash = await this.hashPort.hash(tokens.refreshToken);
    await this.userRepository.updateRefreshToken(user.id, refreshHash);
    return tokens;
  }
}
