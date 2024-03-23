import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  isNumber,
} from 'class-validator';
import { ExceptionMessage } from '../data/exceptionsMessage';

export function IsNumberCustom(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsNumberCustom',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          return isNumber(value);
        },
        defaultMessage(validationArguments: ValidationArguments) {
          return ExceptionMessage.IsNumber(validationArguments.property);
        },
      },
    });
  };
}
