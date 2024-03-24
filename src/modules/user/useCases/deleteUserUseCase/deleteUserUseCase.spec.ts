import { UserRepositoryInMemory } from '../../repositories/user.repository.memory';
import { DeleteUserUseCase } from './deleteUserUseCase';
import { MakeUser } from 'src/modules/user/factories/user.factory';
import { UserNotFoundException } from '../../exceptions/userNotFoundException';

let userRepositoryInMemory: UserRepositoryInMemory;
let deleteUserUseCase: DeleteUserUseCase;

describe('Delete User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    deleteUserUseCase = new DeleteUserUseCase(userRepositoryInMemory);
  });

  it('Should be able to delete a User', async () => {
    const user = MakeUser({ id: 'any' });
    userRepositoryInMemory.users = [user];
    await deleteUserUseCase.execute({
      userId: 'any',
    });
  });

  it('Should be able to throw error when not found user', async () => {
    expect(async () => {
      await deleteUserUseCase.execute({
        userId: 'any',
      });
    }).rejects.toThrow(UserNotFoundException);
  });
});
