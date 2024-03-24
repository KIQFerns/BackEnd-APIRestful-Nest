import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/users.repository';
import { User } from '../../entities/user.entity';
import { hash } from 'bcrypt';
import { UserWithSameEmailException } from '../../exceptions/userWithSameEmailException';

interface CreatedUserRequest {
  email: string;
  name: string;
  password: string;
  role: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, name, password, role }: CreatedUserRequest) {
    const UserAlreadyExists = await this.userRepository.findByEmail(email);
    if (UserAlreadyExists) throw new UserWithSameEmailException();
    const user = new User({
      email,
      name,
      role,
      password: await hash(password, 10),
    });

    await this.userRepository.create(user);

    return user;
  }
}
