import dotenv from 'dotenv';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

dotenv.config();

const app = express();

const authTarget = process.env.AUTH_SERVICE_URL ?? 'http://auth-service:3001';
const dataTarget = process.env.DATA_SERVICE_URL ?? 'http://data-service:3002';
const port = Number(process.env.PORT ?? 3000);

app.use('/auth', createProxyMiddleware({ target: authTarget, changeOrigin: true }));
app.use('/data', createProxyMiddleware({ target: dataTarget, changeOrigin: true }));

app.listen(port, () => {
  console.log(`api-gateway running on ${port}`);
});
