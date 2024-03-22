import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../repositories/product.repository';

interface GetProductRequest {
  userId: string;
  page?: string;
  perPage?: string;
}

@Injectable()
export class GetManyProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({ userId, page, perPage }: GetProductRequest) {
    const DEFAULT_PAGE = 1;
    const DEFAULT_PER_PAGE = 20;

    const currentPage = Number(page) || DEFAULT_PAGE;
    const currentPerPage = Number(perPage) || DEFAULT_PER_PAGE;

    const products = await this.productRepository.findManyByUserId(
      userId,
      currentPage,
      currentPerPage,
    );

    return products;
  }
}
