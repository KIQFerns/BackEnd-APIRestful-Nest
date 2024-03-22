import { Decimal } from '@prisma/client/runtime/library';
import { Product } from '../../entities/product.entity';
import { ProductRepository } from '../../repositories/product.repository';
import { Injectable } from '@nestjs/common';

interface CreateProductRequest {
  name: string;
  description?: string;
  userId: string;
  value: Decimal;
  quantity: number;
}

@Injectable()
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
