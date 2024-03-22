import { User } from '../../../../modules/user/entities/user.entity';
import { User as UserRaw } from '@prisma/client';
export class PrismaUserMapper {
  static toPrisma({ createdAt, name, password, email, id }: User): UserRaw {
    return {
      createdAt,
      name,
      password,
      email,
      id,
    };
  }

  static toDomain({ id, createdAt, name, password, email }: UserRaw): User {
    return new User({ createdAt, name, password, email }, id);
  }
}
