import { MakeUser } from 'src/modules/user/factories/user.factory';
import { ProductRepositoryInMemory } from '../../repositories/product.repository.memory';
import { GetProductUseCase } from './getProductUseCase';
import { MakeProduct } from '../../factories/product.factory';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ProductWithoutPermissionException } from '../../exceptions/productWithouPermissionException';
import { ProductsNotFoundException } from '../../exceptions/productNotFoundException';

let productRepositoryInMemory: ProductRepositoryInMemory;
let getProductUseCase: GetProductUseCase;

describe('Get product', () => {
  beforeEach(() => {
    productRepositoryInMemory = new ProductRepositoryInMemory();
    getProductUseCase = new GetProductUseCase(productRepositoryInMemory);
  });

  it('Should be able to get a product', async () => {
    const user = MakeUser({});
    const product = MakeProduct({ userId: user.id });

    productRepositoryInMemory.products = [product];

    const newName = 'Tablet';
    const newDescription = '5gb ram core i7 ';
    const result = await getProductUseCase.execute({
      productId: product.id,
      userId: user.id,
    });

    expect(result).toEqual(product);
  });

  it('Should be able to throw error when not found product', async () => {
    expect(async () => {
      await getProductUseCase.execute({
        productId: 'invalidId',
        userId: 'invalidId',
      });
    }).rejects.toThrow(ProductsNotFoundException);
  });

  it('Should be able to throw error when product has another user', async () => {
    const product = MakeProduct({});

    productRepositoryInMemory.products = [product];
    expect(async () => {
      await getProductUseCase.execute({
        productId: product.id,
        userId: 'invalidId',
      });
    }).rejects.toThrow(ProductWithoutPermissionException);
  });
});
