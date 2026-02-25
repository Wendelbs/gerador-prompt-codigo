import { ClientSession } from 'mongoose';
import { Acknowledgment } from '../../../domain/entities/acknowledgment.entity';
import { AcknowledgmentRepository } from '../../../domain/repositories/acknowledgment.repository';
import { AcknowledgmentModel } from '../schemas/acknowledgment.schema';

export class MongoAcknowledgmentRepository implements AcknowledgmentRepository {
  async create(entity: Acknowledgment, session: ClientSession): Promise<void> {
    await AcknowledgmentModel.create(
      [
        {
          _id: entity.id,
          userId: entity.userId,
          message: entity.message,
          version: entity.version,
          createdAt: entity.createdAt,
          updatedAt: entity.updatedAt,
        },
      ],
      { session },
    );
  }

  async listByUser(userId: string): Promise<Acknowledgment[]> {
    const docs = await AcknowledgmentModel.find({ userId }).lean();
    return docs.map((doc) => new Acknowledgment(doc._id, doc.userId, doc.message, doc.createdAt, doc.updatedAt, doc.version));
  }

  async updateMessage(id: string, userId: string, newMessage: string, expectedVersion: number): Promise<boolean> {
    const result = await AcknowledgmentModel.updateOne(
      { _id: id, userId, version: expectedVersion },
      { $set: { message: newMessage }, $inc: { version: 1 } },
    );
    return result.modifiedCount > 0;
  }

  async delete(id: string, userId: string): Promise<boolean> {
    const result = await AcknowledgmentModel.deleteOne({ _id: id, userId });
    return result.deletedCount > 0;
  }
}
