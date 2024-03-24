import { Role } from 'src/infra/http/modules/auth/roles/role.enum';
import { User } from '../../../../modules/user/entities/user.entity';
import { User as UserRaw } from '@prisma/client';

export class PrismaUserMapper {
  static toPrisma({
    createdAt,
    name,
    password,
    email,
    role,
    id,
  }: User): UserRaw {
    return {
      createdAt,
      name,
      password,
      email,
      role: role,
      id,
    };
  }

  static toDomain({
    id,
    createdAt,
    name,
    password,
    email,
    role,
  }: UserRaw): User {
    return new User({ createdAt, name, password, email, role }, id);
  }
}
