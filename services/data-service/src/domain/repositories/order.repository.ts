import { Order } from '../entities/order.entity';

export interface OrderRepository {
  create(entity: Order): Promise<void>;
  listByUser(userId: string): Promise<Order[]>;
  updateDescription(id: string, userId: string, newDescription: string, expectedVersion: number): Promise<boolean>;
  delete(id: string, userId: string): Promise<boolean>;
}
