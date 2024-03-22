import { Decimal } from '@prisma/client/runtime/library';
import { ProductRepositoryInMemory } from '../../repositories/product.repository.memory';
import { CreateProductUseCase } from './createProductUseCase';

let productRepositoryInMemory: ProductRepositoryInMemory;
let createProductUseCase: CreateProductUseCase;

describe('Create note', () => {
  beforeEach(() => {
    productRepositoryInMemory = new ProductRepositoryInMemory();
    createProductUseCase = new CreateProductUseCase(productRepositoryInMemory);
  });

  it('Should be able to create a product', async () => {
    expect(productRepositoryInMemory.products).toEqual([]);

    const product = await createProductUseCase.execute({
      name: 'celular',
      value: new Decimal(10.5),
      quantity: 5,
      userId: 'any',
    });

    expect(productRepositoryInMemory.products).toEqual([product]);
  });
});
