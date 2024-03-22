import { MakeUser } from 'src/modules/user/factories/user.factory';
import { ProductRepositoryInMemory } from '../../repositories/product.repository.memory';
import { EditProductUseCase } from './editProductUseCase';
import { MakeProduct } from '../../factories/product.factory';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

let productRepositoryInMemory: ProductRepositoryInMemory;
let editProductUseCase: EditProductUseCase;

describe('Edit product', () => {
  beforeEach(() => {
    productRepositoryInMemory = new ProductRepositoryInMemory();
    editProductUseCase = new EditProductUseCase(productRepositoryInMemory);
  });

  it('Should be able to edit a product', async () => {
    const user = MakeUser({});
    const product = MakeProduct({ userId: user.id });

    productRepositoryInMemory.products = [product];

    const newName = 'Tablet';
    const newDescription = '5gb ram core i7 ';
    await editProductUseCase.execute({
      name: newName,
      description: newDescription,
      value: 5,
      quantity: 1,
      productId: product.id,
      userId: user.id,
    });

    expect(productRepositoryInMemory.products[0].name).toEqual(newName);
    expect(productRepositoryInMemory.products[0].description).toEqual(
      newDescription,
    );
  });

  it('Should be able to throw error when not found product', async () => {
    expect(async () => {
      await editProductUseCase.execute({
        name: 'Celular',
        value: 5,
        quantity: 1,
        productId: 'invalidId',
        userId: 'invalidId',
      });
    }).rejects.toThrow(NotFoundException);
  });

  it('Should be able to throw error when product has another user', async () => {
    const product = MakeProduct({});

    productRepositoryInMemory.products = [product];
    expect(async () => {
      await editProductUseCase.execute({
        name: 'Celular',
        value: 5,
        quantity: 1,
        productId: product.id,
        userId: 'invalidId',
      });
    }).rejects.toThrow(UnauthorizedException);
  });
});
