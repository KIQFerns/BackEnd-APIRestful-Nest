import { UserRepository } from '../../repositories/users.repository';
import { UserNotFoundException } from '../../exceptions/UserNotFoundException';
import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';

interface EditUserRequest {
  userId: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

@Injectable()
export class EditUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ userId, name, email, password, role }: EditUserRequest) {
    const user = await this.userRepository.findById(userId);

    if (!user) throw new UserNotFoundException();

    user.name = name;
    user.email = email;
    user.password = await hash(password, 10);
    user.role = role;

    await this.userRepository.save(user);
  }
}
