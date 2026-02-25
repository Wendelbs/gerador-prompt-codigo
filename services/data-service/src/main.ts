import express from 'express';
import mongoose from 'mongoose';
import { env } from './infrastructure/config/env';
import { authMiddleware } from './infrastructure/controllers/auth-middleware';
import { MongoAcknowledgmentRepository } from './infrastructure/persistence/repositories/mongo-acknowledgment.repository';
import { MongoAuditRepository } from './infrastructure/persistence/repositories/mongo-audit.repository';
import { MongoUnitOfWork } from './infrastructure/persistence/mongo-unit-of-work';
import { CreateAcknowledgmentUseCase } from './application/use-cases/create-acknowledgment.use-case';
import { dataController } from './infrastructure/controllers/data.controller';
import { MongoOrderRepository } from './infrastructure/persistence/repositories/mongo-order.repository';

async function bootstrap(): Promise<void> {
  await mongoose.connect(env.mongoUri);

  const app = express();
  app.use(express.json());

  const acknowledgmentRepository = new MongoAcknowledgmentRepository();
  const auditRepository = new MongoAuditRepository();
  const unitOfWork = new MongoUnitOfWork();
  const orderRepository = new MongoOrderRepository();

  const createAcknowledgmentUseCase = new CreateAcknowledgmentUseCase(
    acknowledgmentRepository,
    auditRepository,
    unitOfWork,
  );

  app.use(authMiddleware(env.jwtAccessSecret));
  app.use('/data', dataController(createAcknowledgmentUseCase, acknowledgmentRepository, orderRepository));
  app.listen(env.port, () => console.log(`data-service running on ${env.port}`));
}

bootstrap();
