import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserUseCase } from 'src/modules/user/useCases/createUserUseCase/createUserUseCase';
import { DatabaseModule } from 'src/infra/database/prisma/database.module';
import { DeleteUserUseCase } from 'src/modules/user/useCases/deleteUserUseCase/deleteUserUseCase';
import { EditUserUseCase } from 'src/modules/user/useCases/editUserUseCase/editUserUseCase';
import { GetManyUsertUseCase } from 'src/modules/user/useCases/getManyUserUseCase/getManyUserUseCase';

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
