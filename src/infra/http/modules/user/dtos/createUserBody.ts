import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class createUserBody {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
