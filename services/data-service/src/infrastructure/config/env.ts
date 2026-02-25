import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT ?? 3002),
  mongoUri: process.env.MONGO_URI ?? 'mongodb://localhost:27017/data',
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET ?? 'access_secret',
};
