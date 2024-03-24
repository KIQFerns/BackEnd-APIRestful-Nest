import { IsIn, IsOptional } from 'class-validator';
import { IsEmailCustom } from 'src/infra/http/classValidators/decorators/isEmailCustom';
import { IsNotEmptyCustom } from 'src/infra/http/classValidators/decorators/isNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidators/decorators/isStringCustom';
import { MinLengthCustom } from 'src/infra/http/classValidators/decorators/minLengthCustom';
import { Role } from '../../auth/roles/role.enum';
import { IsInCustom } from 'src/infra/http/classValidators/decorators/isInCustome';
import { ApiProperty } from '@nestjs/swagger';

export class EditUserBody {
  @ApiProperty()
  @IsNotEmptyCustom()
  @IsStringCustom()
  @IsEmailCustom()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsNotEmptyCustom()
  @IsStringCustom()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsNotEmptyCustom()
  @IsStringCustom()
  @MinLengthCustom(6)
  @IsOptional()
  password: string;

  @ApiProperty()
  @IsNotEmptyCustom()
  @IsStringCustom()
  @IsOptional()
  @IsInCustom(['user', 'admin'])
  role: string;
}
