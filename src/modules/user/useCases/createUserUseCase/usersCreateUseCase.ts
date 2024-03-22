import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/users.repository';
import { User } from '../../entities/user.entity';
import { hash } from 'bcrypt';

interface CreatedUserRequest {
  email: string;
  name: string;
  password: string;
}

@Injectable()
export class UsersCreateUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, name, password }: CreatedUserRequest) {
    const user = new User({
      email,
      name,
      password: await hash(password, 10),
    });
    await this.userRepository.create(user);
    return user;
  }
}
