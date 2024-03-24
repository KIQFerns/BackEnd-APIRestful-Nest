import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserUseCase } from 'src/modules/user/useCases/createUserUseCase/createUserUseCase';
import { DatabaseModule } from 'src/infra/database/prisma/database.module';
import { DeleteUserUseCase } from 'src/modules/user/useCases/deleteUserUseCase/deleteUserUseCase';
import { EditUserUseCase } from 'src/modules/user/useCases/editUserUseCase/editUserUseCase';
import { GetManyUsertUseCase } from 'src/modules/user/useCases/getManyUserUseCase/getManyUserUseCase';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../auth/guards/roles.guard';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    DeleteUserUseCase,
    EditUserUseCase,
    GetManyUsertUseCase,
  ],
})
export class UserModule {}
