import { Product } from 'src/modules/product/entities/product.entity';
import { ProductRepository } from 'src/modules/product/repositories/product.repository';
import { PrismaService } from '../prisma.service';
import { PrismaProductMapper } from '../mappers/prismaProductMapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private prisma: PrismaService) {}

  async create(product: Product): Promise<void> {
    const productRaw = PrismaProductMapper.toPrisma(product);

    await this.prisma.product.create({ data: productRaw });
  }

  async findById(id: string): Promise<Product | null> {
    const productRaw = await this.prisma.product.findUnique({
      where: { id: id },
    });

    if (!productRaw) return null;

    return PrismaProductMapper.toDomain(productRaw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }

  async save(product: Product): Promise<void> {
    const productRaw = PrismaProductMapper.toPrisma(product);

    await this.prisma.product.update({
      data: productRaw,
      where: { id: productRaw.id },
    });
  }

  async findManyByUserId(
    userId: string,
    page: number,
    perPage: number,
  ): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: { userId },
      take: perPage,
      skip: (page - 1) * perPage,
    });
    console.log('aklaz', products, perPage, (page - 1) * perPage);
    return products.map(PrismaProductMapper.toDomain);
  }
}
