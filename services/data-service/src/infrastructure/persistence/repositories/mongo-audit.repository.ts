import { ClientSession } from 'mongoose';
import { AuditRepository } from '../../../application/ports/audit.repository';
import { AuditModel } from '../schemas/audit.schema';

export class MongoAuditRepository implements AuditRepository {
  async log(action: string, userId: string, targetId: string, session: ClientSession): Promise<void> {
    await AuditModel.create([{ action, userId, targetId }], { session });
  }
}
