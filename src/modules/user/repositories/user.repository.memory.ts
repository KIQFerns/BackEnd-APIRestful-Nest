import { User } from '../entities/user.entity';
import { UserRepository } from './users.repository';

export class UserRepositoryInMemory implements UserRepository {
  public users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);
    if (!user) return null;
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);
    if (!user) return null;
    return user;
  }

  validateAdmin(id: string): Promise<User | null> {
    //todo
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<void> {
    //todo
    throw new Error('Method not implemented.');
  }

  save(user: User): Promise<void> {
    //todo
    throw new Error('Method not implemented.');
  }

  findMany(page: number, perPage: number): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
}
