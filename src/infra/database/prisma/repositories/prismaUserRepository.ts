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

  async findByName(name: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { name } });
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

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  async save(user: User): Promise<void> {
    const userRaw = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.update({
      data: userRaw,
      where: { id: userRaw.id },
    });
  }

  async findMany(page: number, perPage: number): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
    });

    return users.map(PrismaUserMapper.toDomain);
  }
}
