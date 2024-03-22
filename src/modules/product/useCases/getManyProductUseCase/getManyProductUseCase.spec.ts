import { MakeUser } from 'src/modules/user/factories/user.factory';
import { ProductRepositoryInMemory } from '../../repositories/product.repository.memory';
import { GetManyProductUseCase } from './getManyProductUseCase';
import { MakeProduct } from '../../factories/product.factory';
import { Product } from '../../entities/product.entity';

let productRepositoryInMemory: ProductRepositoryInMemory;
let getManyProductUseCase: GetManyProductUseCase;

describe('Get Many product', () => {
  beforeEach(() => {
    productRepositoryInMemory = new ProductRepositoryInMemory();
    getManyProductUseCase = new GetManyProductUseCase(
      productRepositoryInMemory,
    );
  });

  it('Should be able to get many products', async () => {
    const user = MakeUser({});

    const products = [...new Array(10)].map(() =>
      MakeProduct({ userId: user.id }),
    );

    productRepositoryInMemory.products = products;

    const result = await getManyProductUseCase.execute({ userId: user.id });

    expect(result).toEqual(products);
  });

  it('should be able to get only user products', async () => {
    const user1 = MakeUser({});
    const user2 = MakeUser({});
    const products = [...new Array(10)].map((_, index) =>
      MakeProduct({ userId: index < 5 ? user1.id : user2.id }),
    );
    productRepositoryInMemory.products = products;

    const result = await getManyProductUseCase.execute({ userId: user1.id });

    expect(result).toHaveLength(5);
  });

  it('should be able to control products per page', async () => {
    const user = MakeUser({});

    const products = [...new Array(10)].map(() =>
      MakeProduct({ userId: user.id }),
    );

    productRepositoryInMemory.products = products;

    const result = await getManyProductUseCase.execute({
      userId: user.id,
      perPage: '8',
    });

    expect(result).toHaveLength(8);
  });

  it('Should be able to control products page', async () => {
    const user = MakeUser({});

    const products = [...new Array(10)].map((_, index) =>
      MakeProduct({ userId: user.id, name: index < 5 ? 'page 1' : 'page 2' }),
    );

    productRepositoryInMemory.products = products;

    let result: Product[];

    result = await getManyProductUseCase.execute({
      userId: user.id,
      perPage: '5',
      page: '2',
    });

    expect(result[0].name).toEqual('page 2');

    result = await getManyProductUseCase.execute({
      userId: user.id,
      perPage: '5',
      page: '1',
    });

    expect(result[0].name).toEqual('page 1');
  });
});
