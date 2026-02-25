import express from 'express';
import mongoose from 'mongoose';
import { env } from './infrastructure/config/env';
import { MongoUserRepository } from './infrastructure/persistence/repositories/mongo-user.repository';
import { BcryptHashAdapter } from './infrastructure/security/bcrypt-hash.adapter';
import { JwtTokenAdapter } from './infrastructure/security/jwt-token.adapter';
import { RegisterUserUseCase } from './application/use-cases/register-user.use-case';
import { LoginUserUseCase } from './application/use-cases/login-user.use-case';
import { authController } from './infrastructure/controllers/auth.controller';

async function bootstrap(): Promise<void> {
  await mongoose.connect(env.mongoUri);

  const app = express();
  app.use(express.json());

  const userRepository = new MongoUserRepository();
  const hashAdapter = new BcryptHashAdapter();
  const tokenAdapter = new JwtTokenAdapter(env.jwtAccessSecret, env.jwtRefreshSecret);

  const registerUseCase = new RegisterUserUseCase(userRepository, hashAdapter, tokenAdapter);
  const loginUseCase = new LoginUserUseCase(userRepository, hashAdapter, tokenAdapter);

  app.use('/auth', authController(registerUseCase, loginUseCase));
  app.listen(env.port, () => console.log(`auth-service running on ${env.port}`));
}

bootstrap();
