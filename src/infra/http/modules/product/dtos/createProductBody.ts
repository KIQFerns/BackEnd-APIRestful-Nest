import { Decimal } from '@prisma/client/runtime/library';
import { IsDecimal, IsNumber, IsOptional } from 'class-validator';
import { IsNotEmptyCustom } from 'src/infra/http/classValidators/decorators/isNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidators/decorators/isStringCustom';

export class CreateProductBody {
  @IsStringCustom()
  @IsNotEmptyCustom()
  name: string;

  @IsStringCustom()
  @IsOptional()
  description: string;

  @IsDecimal()
  @IsNotEmptyCustom()
  value: Decimal;

  @IsNumber()
  @IsNotEmptyCustom()
  quantity: number;
}
