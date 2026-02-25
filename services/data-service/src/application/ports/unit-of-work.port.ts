import { ClientSession } from 'mongoose';

export interface UnitOfWorkPort {
  withTransaction<T>(work: (session: ClientSession) => Promise<T>): Promise<T>;
}
