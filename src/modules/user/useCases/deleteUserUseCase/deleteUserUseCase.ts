import { Injectable } from '@nestjs/common';

import { UserRepository } from '../../repositories/users.repository';
import { UserNotFoundException } from '../../exceptions/UserNotFoundException';

interface DeleteUserRequest {
  userId: string;
}

@Injectable()
export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ userId }: DeleteUserRequest) {
    const user = await this.userRepository.findById(userId);

    if (!user) throw new UserNotFoundException();

    await this.userRepository.delete(userId);
  }
}
