import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (secret: string) => (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token ausente' });
  }

  try {
    const token = auth.replace('Bearer ', '');
    const payload = jwt.verify(token, secret) as { sub: string };
    (req as Request & { userId: string }).userId = payload.sub;
    return next();
  } catch {
    return res.status(401).json({ message: 'Token inválido' });
  }
};
