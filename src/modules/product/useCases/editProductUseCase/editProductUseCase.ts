import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Product } from '../../entities/product.entity';
import { ProductRepository } from '../../repositories/product.repository';

interface EditProductRequest {
  productId: string;
  name: string;
  description?: string;
  userId: string;
  value: number;
  quantity: number;
}
export class EditProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    productId,
    name,
    userId,
    description,
    value,
    quantity,
  }: EditProductRequest) {
    const product = await this.productRepository.findById(productId);

    if (!product) throw new NotFoundException();

    if (product.userId != userId) throw new UnauthorizedException();

    product.description = description ?? null;
    product.name = name;
    product.quantity = quantity;
    product.value = value;

    await this.productRepository.save(product);
  }
}
