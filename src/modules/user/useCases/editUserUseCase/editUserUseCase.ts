import { UserRepository } from '../../repositories/users.repository';
import { UserNotFoundException } from '../../exceptions/UserNotFoundException';
import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { Role } from 'src/infra/http/modules/auth/roles/role.enum';
import { UserWithSameEmailException } from '../../exceptions/userWithSameEmailException copy';
import { UserWithSameNameException } from '../../exceptions/userWithSameNameException';

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

    if (name !== undefined) {
      const EmailAlreadyExists = await this.userRepository.findByEmail(email);
      if (EmailAlreadyExists) throw new UserWithSameEmailException();
      user.name = name;
    }

    if (email !== undefined) {
      const NameAlreadyExists = await this.userRepository.findByName(name);
      if (NameAlreadyExists) throw new UserWithSameNameException();
      user.email = email;
    }

    if (password !== undefined) {
      user.password = await hash(password, 10);
    }
    if (role !== undefined) {
      user.role = role;
    }

    await this.userRepository.save(user);
  }
}
