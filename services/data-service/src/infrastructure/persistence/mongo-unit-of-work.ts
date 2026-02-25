import mongoose, { ClientSession } from 'mongoose';
import { UnitOfWorkPort } from '../../application/ports/unit-of-work.port';

export class MongoUnitOfWork implements UnitOfWorkPort {
  async withTransaction<T>(work: (session: ClientSession) => Promise<T>): Promise<T> {
    const session = await mongoose.startSession();
    try {
      let result: T | undefined;
      await session.withTransaction(async () => {
        result = await work(session);
      });
      return result as T;
    } finally {
      await session.endSession();
    }
  }
}
