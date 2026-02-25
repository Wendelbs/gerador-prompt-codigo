import crypto from 'crypto';
import { Router } from 'express';
import { z } from 'zod';
import { CreateAcknowledgmentUseCase } from '../../application/use-cases/create-acknowledgment.use-case';
import { MongoAcknowledgmentRepository } from '../persistence/repositories/mongo-acknowledgment.repository';
import { MongoOrderRepository } from '../persistence/repositories/mongo-order.repository';
import { Order } from '../../domain/entities/order.entity';

export const dataController = (
  createAcknowledgmentUseCase: CreateAcknowledgmentUseCase,
  acknowledgmentRepository: MongoAcknowledgmentRepository,
  orderRepository: MongoOrderRepository,
): Router => {
  const router = Router();

  router.post('/acknowledgments', async (req, res) => {
    try {
      const schema = z.object({ message: z.string().min(3) });
      const payload = schema.parse(req.body);
      const userId = (req as typeof req & { userId: string }).userId;
      const output = await createAcknowledgmentUseCase.execute({ userId, message: payload.message });
      return res.status(201).json(output);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  });

  router.get('/acknowledgments', async (req, res) => {
    const userId = (req as typeof req & { userId: string }).userId;
    const list = await acknowledgmentRepository.listByUser(userId);
    return res.status(200).json(list);
  });

  router.put('/acknowledgments/:id', async (req, res) => {
    const schema = z.object({ message: z.string().min(3), version: z.number().int().min(0) });
    const payload = schema.parse(req.body);
    const userId = (req as typeof req & { userId: string }).userId;
    const updated = await acknowledgmentRepository.updateMessage(req.params.id, userId, payload.message, payload.version);
    if (!updated) return res.status(409).json({ message: 'Conflito de versão. Atualize e tente novamente.' });
    return res.sendStatus(204);
  });

  router.delete('/acknowledgments/:id', async (req, res) => {
    const userId = (req as typeof req & { userId: string }).userId;
    await acknowledgmentRepository.delete(req.params.id, userId);
    return res.sendStatus(204);
  });

  router.post('/orders', async (req, res) => {
    const schema = z.object({ description: z.string().min(3) });
    const payload = schema.parse(req.body);
    const userId = (req as typeof req & { userId: string }).userId;
    const now = new Date();
    const order = new Order(crypto.randomUUID(), userId, payload.description, now, now, 0);
    await orderRepository.create(order);
    return res.status(201).json({ id: order.id });
  });

  router.get('/orders', async (req, res) => {
    const userId = (req as typeof req & { userId: string }).userId;
    const list = await orderRepository.listByUser(userId);
    return res.status(200).json(list);
  });

  router.put('/orders/:id', async (req, res) => {
    const schema = z.object({ description: z.string().min(3), version: z.number().int().min(0) });
    const payload = schema.parse(req.body);
    const userId = (req as typeof req & { userId: string }).userId;
    const updated = await orderRepository.updateDescription(req.params.id, userId, payload.description, payload.version);
    if (!updated) return res.status(409).json({ message: 'Conflito de versão. Atualize e tente novamente.' });
    return res.sendStatus(204);
  });

  router.delete('/orders/:id', async (req, res) => {
    const userId = (req as typeof req & { userId: string }).userId;
    await orderRepository.delete(req.params.id, userId);
    return res.sendStatus(204);
  });

  return router;
};
