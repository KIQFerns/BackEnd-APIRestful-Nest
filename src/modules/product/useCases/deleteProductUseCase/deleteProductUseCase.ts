import { ProductRepository } from '../../repositories/product.repository';
import { ProductsNotFoundException } from '../../exceptions/productNotFoundException';
import { ProductWithoutPermissionException } from '../../exceptions/productWithouPermissionException';
import { Injectable } from '@nestjs/common';

interface DeleteProductRequest {
  productId: string;
  userId: string;
}

@Injectable()
export class DeleteProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({ productId, userId }: DeleteProductRequest) {
    const product = await this.productRepository.findById(productId);

    if (!product) throw new ProductsNotFoundException();

    if (product.userId != userId)
      throw new ProductWithoutPermissionException({ actionName: 'deletar' });

    await this.productRepository.delete(productId);
  }
}
