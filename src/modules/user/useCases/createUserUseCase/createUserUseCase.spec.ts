import { CreateUserUseCase } from './createUserUseCase';
import { UserRepositoryInMemory } from '../../repositories/user.repository.memory';
import { compare } from 'bcrypt';
import { MakeUser } from '../../factories/user.factory';
import { CreateProductUseCase } from 'src/modules/product/useCases/createProductUseCase/createProductUseCase';

let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('Create User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('Should be able to create user', async () => {
    expect(userRepositoryInMemory.users).toEqual([]);

    const user = await createUserUseCase.execute({
      email: 'email@email',
      name: 'Vitor',
      password: '123456789',
    });

    expect(userRepositoryInMemory.users).toEqual([user]);
  });

  it('Should be able to create user with password encrypted', async () => {
    const userPasswordWithoutEncryption = '123456789';

    const user = await createUserUseCase.execute({
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

  it('Should be able to throw error with create user with email that already exits', () => {
    const user = MakeUser({});

    userRepositoryInMemory.users = [user];

    expect(
      async () =>
        await createUserUseCase.execute({
          email: user.email,
          name: 'name',
          password: 'password',
        }),
    );
  });
});
