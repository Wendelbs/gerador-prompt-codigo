import { ClientSession } from 'mongoose';

export interface AuditRepository {
  log(action: string, userId: string, targetId: string, session: ClientSession): Promise<void>;
}
