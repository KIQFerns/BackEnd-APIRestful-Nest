import { Product } from '../entities/product.entity';

export abstract class ProductRepository {
  abstract create(product: Product): Promise<void>;

  abstract findById(id: string): Promise<Product | null>;

  abstract delete(id: string): Promise<void>;

  abstract save(product: Product): Promise<void>;

  abstract findManyByUserId(
    userId: string,
    page: number,
    perPage: number,
  ): Promise<Product[]>;
}
