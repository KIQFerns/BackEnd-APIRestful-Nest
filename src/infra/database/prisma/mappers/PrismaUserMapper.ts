import { User } from '../../../../modules/user/entities/users.entity';
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
}
