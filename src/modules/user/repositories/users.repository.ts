import { User } from '../entities/users.entity';

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
}
