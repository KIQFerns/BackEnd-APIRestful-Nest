import {
  Controller,
  Post,
  Body,
  Delete,
  Request,
  Param,
  Put,
  Get,
  Query,
} from '@nestjs/common';
import { CreateUserUseCase } from 'src/modules/user/useCases/createUserUseCase/createUserUseCase';
import { CreateUserBody } from './dtos/createUserBody';
import { UserViewModel } from './viewModel/userViewModel';
import { AuthenticatedRequestModel } from '../auth/models/authenticatedRequestModel';
import { DeleteUserUseCase } from 'src/modules/user/useCases/deleteUserUseCase/deleteUserUseCase';
import { EditUserBody } from './dtos/editUserBody';
import { EditUserUseCase } from 'src/modules/user/useCases/editUserUseCase/editUserUseCase';
import { GetManyUsertUseCase } from 'src/modules/user/useCases/getManyUserUseCase/getManyUserUseCase';

@Controller('users')
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
    private editUserUseCase: EditUserUseCase,
    private getManyUserUseCase: GetManyUsertUseCase,
  ) {}

  @Post()
  async createUser(@Body() body: CreateUserBody) {
    const { email, name, password, positionId } = body;
    const user = await this.createUserUseCase.execute({
      name,
      email,
      password,
      positionId,
    });
    return UserViewModel.toHttp(user);
  }

  @Delete(':id')
  async deleteUser(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') userId: string,
  ) {
    await this.deleteUserUseCase.execute({
      userId: userId,
      adminId: request.user.id,
    });
  }

  @Put(':id')
  async editUser(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') userId: string,
    @Body() body: EditUserBody,
  ) {
    const { name, email, password, positionId } = body;
    await this.editUserUseCase.execute({
      userId,
      name,
      email,
      password,
      positionId,
    });
  }

  @Get()
  async getManyUser(
    @Request() request: AuthenticatedRequestModel,
    @Query('page') page: string,
    @Query('perPage') perPage: string,
  ) {
    const users = await this.getManyUserUseCase.execute({
      userId: request.user.id,
      page,
      perPage,
    });

    return users.map(UserViewModel.toHttp);
  }
}
