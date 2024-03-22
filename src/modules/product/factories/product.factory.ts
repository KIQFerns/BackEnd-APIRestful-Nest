import { Decimal } from '@prisma/client/runtime/library';
import { Product } from '../entities/product.entity';

type Override = Partial<Product>;
export const MakeProduct = ({ id, ...override }: Override) => {
  return new Product(
    {
      name: 'televisao',
      description: 'hd plana',
      value: new Decimal(10.0),
      quantity: 15,
      userId: 'any',
      ...override,
    },
    id,
  );
};
