import { User } from '../users.entity';

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
}
