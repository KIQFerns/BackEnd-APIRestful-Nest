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

  async findByName(name: string): Promise<User | null> {
    const user = this.users.find((user) => user.name === name);
    if (!user) return null;
    return user;
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id != id);
  }

  async save(user: User): Promise<void> {
    const userIndex = this.users.findIndex(
      (currentProduct) => currentProduct.id === user.id,
    );

    if (userIndex >= 0) this.users[userIndex] = user;
  }
  async findMany(page: number, perPage: number): Promise<User[]> {
    return this.users.slice((page - 1) * perPage, page * perPage);
  }
}
