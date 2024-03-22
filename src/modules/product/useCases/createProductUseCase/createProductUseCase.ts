import { Product } from '../../entities/product.entity';
import { ProductRepository } from '../../repositories/product.repository';

interface CreateProductRequest {
  name: string;
  description?: string;
  userId: string;
  value: number;
  quantity: number;
}
export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    name,
    userId,
    description,
    value,
    quantity,
  }: CreateProductRequest) {
    const product = new Product({
      name,
      userId,
      description,
      value,
      quantity,
    });

    await this.productRepository.create(product);

    return product;
  }
}
