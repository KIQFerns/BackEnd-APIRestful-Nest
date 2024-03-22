import { Product } from 'src/modules/product/entities/product.entity';
import { Product as ProductRaw } from '@prisma/client';

export class PrismaProductMapper {
  static toPrisma({
    createdAt,
    name,
    description,
    quantity,
    value,
    id,
    userId,
  }: Product): ProductRaw {
    return {
      createdAt,
      name,
      description,
      quantity,
      value,
      id,
      userId,
    };
  }

  static toDomain({
    id,
    createdAt,
    name,
    description,
    quantity,
    value,
    userId,
  }: ProductRaw): Product {
    return new Product(
      { createdAt, name, description, quantity, value, userId },
      id,
    );
  }
}
