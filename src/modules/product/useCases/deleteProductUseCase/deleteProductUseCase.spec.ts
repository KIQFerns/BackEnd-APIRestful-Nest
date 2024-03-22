import exp from 'constants';
import { ProductRepositoryInMemory } from '../../repositories/product.repository.memory';
import { DeleteProductUseCase } from './deleteProductUseCase';
import { MakeProduct } from '../../factories/product.factory';
import { MakeUser } from 'src/modules/user/factories/user.factory';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

let productRepositoryInMemory: ProductRepositoryInMemory;
let deleteProductUseCase: DeleteProductUseCase;

describe('Delete product', () => {
  beforeEach(() => {
    productRepositoryInMemory = new ProductRepositoryInMemory();
    deleteProductUseCase = new DeleteProductUseCase(productRepositoryInMemory);
  });

  it('Should be able to delete a product', async () => {
    const user = MakeUser({});
    const product = MakeProduct({ userId: user.id });
    productRepositoryInMemory.products = [product];
    await deleteProductUseCase.execute({
      productId: product.id,
      userId: user.id,
    });
  });

  it('Should be able to throw error when not found product', async () => {
    expect(async () => {
      await deleteProductUseCase.execute({
        productId: 'invalidId',
        userId: 'invalidId',
      });
    }).rejects.toThrow(NotFoundException);
  });

  it('Should be able to throw error when product has another user', async () => {
    const product = MakeProduct({});

    productRepositoryInMemory.products = [product];
    expect(async () => {
      await deleteProductUseCase.execute({
        productId: product.id,
        userId: 'invalidId',
      });
    }).rejects.toThrow(UnauthorizedException);
  });
});
