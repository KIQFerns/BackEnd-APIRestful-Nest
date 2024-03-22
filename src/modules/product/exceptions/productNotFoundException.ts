import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/exceptions/appException';

export class ProductsNotFoundException extends AppException {
  constructor() {
    super({
      message: 'Produto não encontrado',
      status: HttpStatus.NOT_FOUND,
    });
  }
}
