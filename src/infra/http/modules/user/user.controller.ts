import { Controller, Post, Body } from '@nestjs/common';
import { UsersCreateUseCase } from 'src/modules/user/useCases/createUserUseCase/usersCreateUseCase';
import { createUserBody } from './dtos/createUserBody';
import { UserViewModel } from './viewModel/userViewModel';
import { Public } from '../auth/decorators/ispublic';

@Controller('users')
export class UserController {
  constructor(private usersCreateUseCase: UsersCreateUseCase) {}

  @Post()
  async createPost(@Body() body: createUserBody) {
    const { email, name, password } = body;
    const user = await this.usersCreateUseCase.execute({
      name,
      email,
      password,
    });
    return UserViewModel.toHttp(user);
  }
}
