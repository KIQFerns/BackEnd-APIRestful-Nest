import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/exceptions/appException';

interface ProductWithoutPermissionExceptionProps {
  actionName: string;
}

export class ProductWithoutPermissionException extends AppException {
  constructor({ actionName }: ProductWithoutPermissionExceptionProps) {
    super({
      message: `Sem permissão para ${actionName} a anotação`,
      status: HttpStatus.UNAUTHORIZED,
    });
  }
}
