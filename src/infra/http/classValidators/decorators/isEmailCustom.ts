import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  isEmail,
} from 'class-validator';
import { ExceptionMessage } from '../data/exceptionsMessage';

export function IsEmailCustom(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsEmailCustom',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          return isEmail(value);
        },
        defaultMessage(validationArguments: ValidationArguments) {
          return ExceptionMessage.IsEmail(validationArguments.property);
        },
      },
    });
  };
}
