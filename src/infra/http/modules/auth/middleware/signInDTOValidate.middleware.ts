import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { SignInBody } from '../dtos/signInBody';
import { validate } from 'class-validator';
import { mapperClassValidationErrorToAppException } from 'src/utils/mappers';

@Injectable()
export class SignInDTOValidateMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    const signInBody = new SignInBody();
    signInBody.name = body.name;
    signInBody.password = body.password;

    const validations = await validate(signInBody);

    if (validations.length) {
      throw new BadRequestException({
        fields: mapperClassValidationErrorToAppException(validations),
      });
    }

    next();
  }
}
