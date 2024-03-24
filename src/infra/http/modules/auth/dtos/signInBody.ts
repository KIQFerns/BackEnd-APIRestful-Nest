import { IsEmailCustom } from 'src/infra/http/classValidators/decorators/isEmailCustom';
import { IsNotEmptyCustom } from 'src/infra/http/classValidators/decorators/isNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidators/decorators/isStringCustom';
import { MinLengthCustom } from 'src/infra/http/classValidators/decorators/minLengthCustom';

export class SignInBody {
  @IsNotEmptyCustom()
  @IsStringCustom()
  name: string;

  @IsStringCustom()
  @MinLengthCustom(6)
  password: string;
}
