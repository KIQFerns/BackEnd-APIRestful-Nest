import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ProductRepository } from '../../repositories/product.repository';

interface GetProductRequest {
  productId: string;
  userId: string;
}

export class GetProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({ productId, userId }: GetProductRequest) {
    const product = await this.productRepository.findById(productId);

    if (!product) throw new NotFoundException();

    if (product.userId != userId) throw new UnauthorizedException();

    return product;
  }
}
