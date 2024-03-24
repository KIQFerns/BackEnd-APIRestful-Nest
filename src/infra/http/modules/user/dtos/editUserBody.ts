import { IsIn, IsOptional } from 'class-validator';
import { IsEmailCustom } from 'src/infra/http/classValidators/decorators/isEmailCustom';
import { IsNotEmptyCustom } from 'src/infra/http/classValidators/decorators/isNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidators/decorators/isStringCustom';
import { MinLengthCustom } from 'src/infra/http/classValidators/decorators/minLengthCustom';
import { Role } from '../../auth/roles/role.enum';
import { IsInCustom } from 'src/infra/http/classValidators/decorators/isInCustome';

export class EditUserBody {
  @IsNotEmptyCustom()
  @IsStringCustom()
  @IsEmailCustom()
  @IsOptional()
  email: string;

  @IsNotEmptyCustom()
  @IsStringCustom()
  @IsOptional()
  name: string;

  @IsNotEmptyCustom()
  @IsStringCustom()
  @MinLengthCustom(6)
  @IsOptional()
  password: string;

  @IsNotEmptyCustom()
  @IsStringCustom()
  @IsOptional()
  @IsInCustom(['user', 'admin'])
  role: string;
}
