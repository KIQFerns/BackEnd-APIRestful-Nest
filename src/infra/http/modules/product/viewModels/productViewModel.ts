import { Product } from 'src/modules/product/entities/product.entity';

export class ProductViewModel {
  static toHttp({
    id,
    name,
    description,
    value,
    quantity,
    createdAt,
  }: Product) {
    return { id, name, description, value, quantity, createdAt };
  }
}
