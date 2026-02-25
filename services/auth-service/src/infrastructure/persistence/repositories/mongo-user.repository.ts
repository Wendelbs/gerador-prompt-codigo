import { UserRepository } from '../../../domain/repositories/user.repository';
import { User } from '../../../domain/entities/user.entity';
import { UserModel } from '../schemas/user.schema';

export class MongoUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const doc = await UserModel.findOne({ email }).lean();
    if (!doc) return null;
    return new User(doc._id, doc.name, doc.email, doc.passwordHash, doc.refreshTokenHash);
  }

  async findById(id: string): Promise<User | null> {
    const doc = await UserModel.findById(id).lean();
    if (!doc) return null;
    return new User(doc._id, doc.name, doc.email, doc.passwordHash, doc.refreshTokenHash);
  }

  async save(user: User): Promise<User> {
    await UserModel.create({
      _id: user.id,
      name: user.name,
      email: user.email,
      passwordHash: user.passwordHash,
      refreshTokenHash: user.refreshTokenHash,
    });
    return user;
  }

  async updateRefreshToken(userId: string, tokenHash: string | null): Promise<void> {
    await UserModel.updateOne({ _id: userId }, { $set: { refreshTokenHash: tokenHash } });
  }
}
