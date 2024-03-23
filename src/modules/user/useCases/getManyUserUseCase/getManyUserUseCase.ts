import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/users.repository';

interface GetUserRequest {
  userId: string;
  page?: string;
  perPage?: string;
}

@Injectable()
export class GetManyUsertUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ userId, page, perPage }: GetUserRequest) {
    const DEFAULT_PAGE = 1;
    const DEFAULT_PER_PAGE = 20;

    const currentPage = Number(page) || DEFAULT_PAGE;
    const currentPerPage = Number(perPage) || DEFAULT_PER_PAGE;

    const products = await this.userRepository.findMany(
      currentPage,
      currentPerPage,
    );

    return products;
  }
}
