import { User } from 'src/modules/user/entities/users.entity';
import { UserRepository } from 'src/modules/user/repositories/users.repository';
import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from '../mappers/PrismaUserMapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    const UserRaw = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.create({
      data: UserRaw,
    });
  }
}