import { Product } from '../entities/product.entity';
import { ProductRepository } from './product.repository';

export class ProductRepositoryInMemory implements ProductRepository {
  public products: Product[] = [];

  async create(product: Product): Promise<void> {
    this.products.push(product);
  }

  async findById(id: string): Promise<Product | null> {
    const product = this.products.find((product) => product.id === id);
    if (!product) return null;
    return product;
  }

  async delete(id: string): Promise<void> {
    this.products = this.products.filter((product) => product.id != id);
  }

  async save(product: Product): Promise<void> {
    const productIndex = this.products.findIndex(
      (currentProduct) => currentProduct.id === product.id,
    );

    if (productIndex >= 0) this.products[productIndex] = product;
  }

  async findManyByUserId(
    userId: string,
    page: number,
    perPage: number,
  ): Promise<Product[]> {
    return this.products
      .filter((product) => product.userId === userId)
      .slice((page - 1) * perPage, page * perPage);
  }
}
