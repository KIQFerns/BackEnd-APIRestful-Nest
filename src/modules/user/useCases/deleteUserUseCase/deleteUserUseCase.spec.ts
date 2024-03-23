import { UserRepositoryInMemory } from '../../repositories/user.repository.memory';
import { DeleteUserUseCase } from './deleteUserUseCase';
import { MakeUser } from 'src/modules/user/factories/user.factory';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserNotFoundException } from '../../exceptions/userNotFoundException';
import { UserWithoutPermissionException } from '../../exceptions/userWithoutPermissionException';

let userRepositoryInMemory: UserRepositoryInMemory;
let deleteUserUseCase: DeleteUserUseCase;

describe('Delete product', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    deleteUserUseCase = new DeleteUserUseCase(userRepositoryInMemory);
  });

  it('Should be able to delete a product', async () => {
    const user = MakeUser({ id: 'any' });
    userRepositoryInMemory.users = [user];
    await deleteUserUseCase.execute({
      userId: 'any',
      adminId: 'any',
    });
  });

  it('Should be able to throw error when not found product', async () => {
    expect(async () => {
      await deleteUserUseCase.execute({
        userId: 'any',
        adminId: 'any',
      });
    }).rejects.toThrow(UserNotFoundException);
  });

  //todo test not admin try
});
