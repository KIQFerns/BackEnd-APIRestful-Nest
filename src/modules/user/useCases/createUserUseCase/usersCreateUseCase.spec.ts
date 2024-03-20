import { UsersCreateUseCase } from './usersCreateUseCase';
import { UserRepositoryInMemory } from '../../repositories/user.repository.memory';
import { compare } from 'bcrypt';

let usersCreateUseCase: UsersCreateUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('Create User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    usersCreateUseCase = new UsersCreateUseCase(userRepositoryInMemory);
  });

  it('Should be able to create user', async () => {
    expect(userRepositoryInMemory.users).toEqual([]);

    const user = await usersCreateUseCase.execute({
      email: 'email@email',
      name: 'Vitor',
      password: '123456789',
    });

    expect(userRepositoryInMemory.users).toEqual([user]);
  });

  it('Should be able to create user with password encrypted', async () => {
    const userPasswordWithoutEncryption = '123456789';

    const user = await usersCreateUseCase.execute({
      email: 'email@email',
      name: 'Vitor',
      password: userPasswordWithoutEncryption,
    });

    const userHasPasswordEncrypted = await compare(
      userPasswordWithoutEncryption,
      user.password,
    );

    expect(userHasPasswordEncrypted).toBeTruthy();
  });
});
