import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/exceptions/appException';

export class UserWithSameNameException extends AppException {
  constructor() {
    super({
      message: 'Nome já cadastrado',
      status: HttpStatus.CONFLICT,
    });
  }
}
