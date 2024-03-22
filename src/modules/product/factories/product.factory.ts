import { Product } from '../entities/product.entity';

type Override = Partial<Product>;
export const MakeProduct = ({ id, ...override }: Override) => {
  return new Product(
    {
      name: 'televisao',
      description: 'hd plana',
      value: 10,
      quantity: 15,
      userId: 'any',
      ...override,
    },
    id,
  );
};
