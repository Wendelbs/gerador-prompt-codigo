import { Router } from 'express';
import { z } from 'zod';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.use-case';
import { LoginUserUseCase } from '../../application/use-cases/login-user.use-case';

export const authController = (
  registerUseCase: RegisterUserUseCase,
  loginUseCase: LoginUserUseCase,
): Router => {
  const router = Router();

  router.post('/register', async (req, res) => {
    try {
      const schema = z.object({ name: z.string().min(3), email: z.string().email(), password: z.string().min(8) });
      const payload = schema.parse(req.body);
      const output = await registerUseCase.execute(payload);
      return res.status(201).json(output);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  });

  router.post('/login', async (req, res) => {
    try {
      const schema = z.object({ email: z.string().email(), password: z.string().min(8) });
      const payload = schema.parse(req.body);
      const output = await loginUseCase.execute(payload);
      return res.status(200).json(output);
    } catch (error) {
      return res.status(401).json({ message: (error as Error).message });
    }
  });

  return router;
};
