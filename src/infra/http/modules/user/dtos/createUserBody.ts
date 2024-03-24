import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional } from 'class-validator';
import { IsEmailCustom } from 'src/infra/http/classValidators/decorators/isEmailCustom';
import { IsNotEmptyCustom } from 'src/infra/http/classValidators/decorators/isNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidators/decorators/isStringCustom';
import { MinLengthCustom } from 'src/infra/http/classValidators/decorators/minLengthCustom';

export class CreateUserBody {
  @ApiProperty()
  @IsNotEmptyCustom()
  @IsStringCustom()
  @IsEmailCustom()
  email: string;

  @ApiProperty()
  @IsNotEmptyCustom()
  @IsStringCustom()
  name: string;

  @ApiProperty()
  @IsNotEmptyCustom()
  @IsStringCustom()
  @MinLengthCustom(6)
  password: string;

  @ApiProperty()
  @IsNotEmptyCustom()
  @IsStringCustom()
  @IsOptional()
  @IsIn(['user', 'admin'])
  role: string;
}
