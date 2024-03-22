import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ProductRepository } from '../../repositories/product.repository';
import { ProductsNotFoundException } from '../../exceptions/productNotFoundException';
import { ProductWithoutPermissionException } from '../../exceptions/productWithouPermissionException';

interface GetProductRequest {
  productId: string;
  userId: string;
}

export class GetProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({ productId, userId }: GetProductRequest) {
    const product = await this.productRepository.findById(productId);

    if (!product) throw new ProductsNotFoundException();

    if (product.userId != userId)
      throw new ProductWithoutPermissionException({ actionName: 'encontrar' });

    return product;
  }
}
