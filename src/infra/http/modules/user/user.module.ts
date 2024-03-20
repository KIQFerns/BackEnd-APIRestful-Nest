import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UsersCreateUseCase } from 'src/modules/user/useCases/createUserUseCase/usersCreateUseCase';
import { DatabaseModule } from 'src/infra/database/prisma/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UsersCreateUseCase],
})
export class UserModule {}
