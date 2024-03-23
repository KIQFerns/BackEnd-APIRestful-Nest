import { User } from '../entities/user.entity';

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;

  abstract findByEmail(email: string): Promise<User | null>;

  abstract findById(id: string): Promise<User | null>;

  abstract validateAdmin(id: string): Promise<User | null>;

  abstract delete(id: string): Promise<void>;

  abstract save(user: User): Promise<void>;

  abstract findMany(page: number, perPage: number): Promise<User[]>;
}
