import { ProductRepository } from '../../repositories/product.repository';
import { ProductsNotFoundException } from '../../exceptions/productNotFoundException';
import { ProductWithoutPermissionException } from '../../exceptions/productWithouPermissionException';
import { Decimal } from '@prisma/client/runtime/library';
import { Injectable } from '@nestjs/common';

interface EditProductRequest {
  productId: string;
  name: string;
  description?: string;
  userId: string;
  value: Decimal;
  quantity: number;
}

@Injectable()
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

    if (!product) throw new ProductsNotFoundException();

    if (product.userId != userId)
      throw new ProductWithoutPermissionException({ actionName: 'editar' });

    product.description = description ?? null;
    product.name = name;
    product.quantity = quantity;
    product.value = value;

    await this.productRepository.save(product);
  }
}
