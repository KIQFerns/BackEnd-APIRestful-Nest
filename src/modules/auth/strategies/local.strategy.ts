import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ValidateUserUseCase } from '../useCases/validateUserUseCase/validateUserUseCase';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private validateUserUsecase: ValidateUserUseCase) {
    super({
      usernameField: 'name',
    });
  }

  async validate(name: string, password: string) {
    return await this.validateUserUsecase.execute({
      name,
      password,
    });
  }
}
