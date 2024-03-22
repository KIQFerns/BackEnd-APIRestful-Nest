import { ValidateUserUseCase } from './validateUserUseCase';
import { UserRepositoryInMemory } from 'src/modules/user/repositories/user.repository.memory';
import { User } from 'src/modules/user/entities/user.entity';
import { hash } from 'bcrypt';
import { MakeUser } from 'src/modules/user/factories/user.factory';
import { UnauthorizedException } from '@nestjs/common';

let validateUserUseCase: ValidateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('Validate User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    validateUserUseCase = new ValidateUserUseCase(userRepositoryInMemory);
  });

  it('sohuld be able to return user if credentials are correct', async () => {
    const userPasswordWithoutEncryption = '123456789';

    const user = MakeUser({
      password: await hash(userPasswordWithoutEncryption, 10),
    });

    userRepositoryInMemory.users = [user];

    const result = await validateUserUseCase.execute({
      email: user.email,
      password: userPasswordWithoutEncryption,
    });

    expect(result).toEqual(user);
  });

  it('should be able to throw error when credentials incorrect', async () => {
    const userPasswordWithoutEncryption = '123456789';

    const user = MakeUser({
      password: await hash(userPasswordWithoutEncryption, 10),
    });

    userRepositoryInMemory.users = [user];

    expect(async () => {
      await validateUserUseCase.execute({
        email: 'incorrect@email',
        password: userPasswordWithoutEncryption,
      });
    }).rejects.toThrow(UnauthorizedException);

    expect(async () => {
      await validateUserUseCase.execute({
        email: user.email,
        password: 'incorrect password',
      });
    }).rejects.toThrow(UnauthorizedException);
  });
});
