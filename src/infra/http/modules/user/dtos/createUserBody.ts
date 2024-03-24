import { IsIn, IsOptional } from 'class-validator';
import { IsEmailCustom } from 'src/infra/http/classValidators/decorators/isEmailCustom';
import { IsNotEmptyCustom } from 'src/infra/http/classValidators/decorators/isNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidators/decorators/isStringCustom';
import { MinLengthCustom } from 'src/infra/http/classValidators/decorators/minLengthCustom';

export class CreateUserBody {
  @IsNotEmptyCustom()
  @IsStringCustom()
  @IsEmailCustom()
  email: string;

  @IsNotEmptyCustom()
  @IsStringCustom()
  name: string;

  @IsNotEmptyCustom()
  @IsStringCustom()
  @MinLengthCustom(6)
  password: string;

  @IsNotEmptyCustom()
  @IsStringCustom()
  @IsOptional()
  @IsIn(['user', 'admin'])
  role: string;
}
