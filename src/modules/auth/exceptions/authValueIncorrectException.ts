import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/exceptions/appException';

export class AuthValuesIncorrectException extends AppException {
  constructor() {
    super({
      message: 'Nome de usuário ou senha incorretos',
      status: HttpStatus.UNAUTHORIZED,
    });
  }
}
