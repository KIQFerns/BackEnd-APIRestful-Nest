import { Injectable } from '@nestjs/common';

import { UserRepository } from '../../repositories/users.repository';
import { UserNotFoundException } from '../../exceptions/UserNotFoundException';
import { UserWithoutPermissionException } from '../../exceptions/userWithoutPermissionException';

interface DeleteUserRequest {
  userId: string;
  adminId: string;
}

@Injectable()
export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ adminId, userId }: DeleteUserRequest) {
    const product = await this.userRepository.findById(userId);

    const isAdmin = await this.userRepository.validateAdmin(adminId);

    if (!product) throw new ProductsNotFoundException();

    if (product.userId != userId)
      throw new ProductWithoutPermissionException({ actionName: 'deletar' });

    await this.productRepository.delete(productId);
  }
}
