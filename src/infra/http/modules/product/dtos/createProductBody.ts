import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';
import { IsOptional } from 'class-validator';
import { IsDecimalCustom } from 'src/infra/http/classValidators/decorators/isDecimalCustom';
import { IsNotEmptyCustom } from 'src/infra/http/classValidators/decorators/isNotEmptyCustom';
import { IsNumberCustom } from 'src/infra/http/classValidators/decorators/isNumberCustom';
import { IsStringCustom } from 'src/infra/http/classValidators/decorators/isStringCustom';

export class CreateProductBody {
  @ApiProperty()
  @IsStringCustom()
  @IsNotEmptyCustom()
  name: string;

  @ApiProperty()
  @IsStringCustom()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsDecimalCustom()
  @IsNotEmptyCustom()
  value: Decimal;

  @ApiProperty()
  @IsNumberCustom()
  @IsNotEmptyCustom()
  quantity: number;
}
