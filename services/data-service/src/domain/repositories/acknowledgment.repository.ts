import { ClientSession } from 'mongoose';
import { Acknowledgment } from '../entities/acknowledgment.entity';

export interface AcknowledgmentRepository {
  create(entity: Acknowledgment, session: ClientSession): Promise<void>;
  listByUser(userId: string): Promise<Acknowledgment[]>;
  updateMessage(id: string, userId: string, newMessage: string, expectedVersion: number): Promise<boolean>;
  delete(id: string, userId: string): Promise<boolean>;
}
