import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT ?? 3001),
  mongoUri: process.env.MONGO_URI ?? 'mongodb://localhost:27017/auth',
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET ?? 'access_secret',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET ?? 'refresh_secret',
};
