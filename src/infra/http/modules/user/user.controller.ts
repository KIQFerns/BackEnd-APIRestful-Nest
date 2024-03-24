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
  UseGuards,
} from '@nestjs/common';
import { CreateUserUseCase } from 'src/modules/user/useCases/createUserUseCase/createUserUseCase';
import { CreateUserBody } from './dtos/createUserBody';
import { UserViewModel } from './viewModel/userViewModel';
import { AuthenticatedRequestModel } from '../auth/models/authenticatedRequestModel';
import { DeleteUserUseCase } from 'src/modules/user/useCases/deleteUserUseCase/deleteUserUseCase';
import { EditUserBody } from './dtos/editUserBody';
import { EditUserUseCase } from 'src/modules/user/useCases/editUserUseCase/editUserUseCase';
import { GetManyUsertUseCase } from 'src/modules/user/useCases/getManyUserUseCase/getManyUserUseCase';
import { Roles } from '../auth/decorators/roles';
import { Role } from '../auth/roles/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';

@Controller('users')
@Roles(Role.Admin)
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
    private editUserUseCase: EditUserUseCase,
    private getManyUserUseCase: GetManyUsertUseCase,
  ) {}

  @Post()
  async createUser(@Body() body: CreateUserBody) {
    const { email, name, password, role } = body;
    const user = await this.createUserUseCase.execute({
      name,
      email,
      password,
      role,
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
    });
  }

  @Put(':id')
  async editUser(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') userId: string,
    @Body() body: EditUserBody,
  ) {
    const { name, email, password, role } = body;
    await this.editUserUseCase.execute({
      userId,
      name,
      email,
      password,
      role,
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
