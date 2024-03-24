import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SignInUseCase } from 'src/modules/auth/useCases/signInUseCase/signInUseCase';
import { localAuthGuard } from './guards/localAuth.guard';
import { Public } from './decorators/ispublic';
import { ApiTags } from '@nestjs/swagger';
import { SignInBody } from './dtos/signInBody';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private signInUseCase: SignInUseCase) {}

  @Post('signIn')
  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(localAuthGuard)
  async signIn(@Body() body: SignInBody, @Request() request: any) {
    const access_token = await this.signInUseCase.execute({
      user: request.user,
    });
    return { access_token };
  }
}
