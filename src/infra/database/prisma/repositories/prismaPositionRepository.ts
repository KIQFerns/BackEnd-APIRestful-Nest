import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { PositionRepository } from 'src/modules/position/repositories/position.repository';
import { Position } from 'src/modules/position/entities/position.entity';
import { PrismaPositionMapper } from '../mappers/prismaPositionMapper';

@Injectable()
export class PrismaPositionRepository implements PositionRepository {
  constructor(private prisma: PrismaService) {}

  async create(position: Position): Promise<void> {
    const positionRaw = PrismaPositionMapper.toPrisma(position);

    await this.prisma.position.create({ data: positionRaw });
  }
}
