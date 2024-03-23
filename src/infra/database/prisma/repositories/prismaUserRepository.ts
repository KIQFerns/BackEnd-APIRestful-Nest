import { User } from 'src/modules/user/entities/user.entity';
import { UserRepository } from 'src/modules/user/repositories/users.repository';
import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from '../mappers/prismaUserMapper';
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

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    return PrismaUserMapper.toDomain(user);
  }

  async findById(id: string): Promise<User | null> {
    const userRaw = await this.prisma.user.findUnique({
      where: { id: id },
    });

    if (!userRaw) return null;

    return PrismaUserMapper.toDomain(userRaw);
  }
  validateAdmin(id: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
}
