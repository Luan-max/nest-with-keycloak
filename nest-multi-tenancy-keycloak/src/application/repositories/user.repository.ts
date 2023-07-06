import { User as RawUsers } from '@prisma/client';
import { User } from '../entities/user.entity';

export abstract class UserRepository {
  abstract create(data: User): Promise<RawUsers>;
  abstract findOneByEmail(email: string): Promise<RawUsers>;
}
