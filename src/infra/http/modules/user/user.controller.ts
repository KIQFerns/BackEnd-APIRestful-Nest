import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserUseCase } from 'src/modules/user/useCases/createUserUseCase/createUserUseCase';
import { CreateUserBody } from './dtos/createUserBody';
import { UserViewModel } from './viewModel/userViewModel';
import { Public } from '../auth/decorators/ispublic';

@Controller('users')
export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}
  @Post()
  async createPost(@Body() body: CreateUserBody) {
    const { email, name, password } = body;
    const user = await this.createUserUseCase.execute({
      name,
      email,
      password,
    });
    return UserViewModel.toHttp(user);
  }
}
