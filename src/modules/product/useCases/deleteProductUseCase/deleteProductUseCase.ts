import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Product } from '../../entities/product.entity';
import { ProductRepository } from '../../repositories/product.repository';

interface DeleteProductRequest {
  productId: string;
  userId: string;
}

export class DeleteProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({ productId, userId }: DeleteProductRequest) {
    const product = await this.productRepository.findById(productId);

    if (!product) throw new NotFoundException();

    if (product.userId != userId) throw new UnauthorizedException();

    await this.productRepository.delete(productId);
  }
}
