import { Position } from 'src/modules/position/entities/position.entity';
import { Position as PositionRaw } from '@prisma/client';

export class PrismaPositionMapper {
  static toPrisma({ id, name, createdAt }: Position): PositionRaw {
    return {
      id,
      createdAt,
      name,
    };
  }

  static toDomain({ id, createdAt, name }: PositionRaw): Position {
    return new Position({ name, createdAt }, id);
  }
}
