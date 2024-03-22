import { Decimal } from '@prisma/client/runtime/library';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsNotEmptyCustom } from 'src/infra/http/classValidators/decorators/isNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidators/decorators/isStringCustom';

export class EditProductBody {
  @IsStringCustom()
  @IsNotEmptyCustom()
  name: string;

  @IsStringCustom()
  @IsOptional()
  description: string;

  @IsNotEmptyCustom()
  value: Decimal;

  @IsNotEmptyCustom()
  quantity: number;
}
