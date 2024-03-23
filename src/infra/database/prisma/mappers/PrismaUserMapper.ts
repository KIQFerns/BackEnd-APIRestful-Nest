import { User } from '../../../../modules/user/entities/user.entity';
import { User as UserRaw } from '@prisma/client';
export class PrismaUserMapper {
  static toPrisma({
    createdAt,
    name,
    password,
    email,
    positionId,
    id,
  }: User): UserRaw {
    return {
      createdAt,
      name,
      password,
      email,
      positionId,
      id,
    };
  }

  static toDomain({
    id,
    createdAt,
    name,
    password,
    email,
    positionId,
  }: UserRaw): User {
    return new User({ createdAt, name, password, email, positionId }, id);
  }
}
