import { User } from '../entities/users.entity';
import { UserRepository } from './users.repository';

export class UserRepositoryInMemory implements UserRepository {
  public users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }
}
