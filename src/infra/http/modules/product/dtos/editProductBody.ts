import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsNotEmptyCustom } from 'src/infra/http/classValidators/decorators/isNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidators/decorators/isStringCustom';

export class EditProductBody {
  @ApiProperty()
  @IsStringCustom()
  @IsNotEmptyCustom()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsStringCustom()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsNotEmptyCustom()
  @IsOptional()
  value: Decimal;

  @ApiProperty()
  @IsNotEmptyCustom()
  @IsOptional()
  quantity: number;
}
