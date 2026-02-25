import crypto from 'crypto';
import { OrderRepository } from '../../../domain/repositories/order.repository';
import { Order } from '../../../domain/entities/order.entity';
import { OrderModel } from '../schemas/order.schema';

export class MongoOrderRepository implements OrderRepository {
  async create(entity: Order): Promise<void> {
    await OrderModel.create({
      _id: entity.id || crypto.randomUUID(),
      userId: entity.userId,
      description: entity.description,
      version: entity.version,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  async listByUser(userId: string): Promise<Order[]> {
    const docs = await OrderModel.find({ userId }).lean();
    return docs.map((doc) => new Order(doc._id, doc.userId, doc.description, doc.createdAt, doc.updatedAt, doc.version));
  }

  async updateDescription(id: string, userId: string, newDescription: string, expectedVersion: number): Promise<boolean> {
    const result = await OrderModel.updateOne(
      { _id: id, userId, version: expectedVersion },
      { $set: { description: newDescription }, $inc: { version: 1 } },
    );
    return result.modifiedCount > 0;
  }

  async delete(id: string, userId: string): Promise<boolean> {
    const result = await OrderModel.deleteOne({ _id: id, userId });
    return result.deletedCount > 0;
  }
}
