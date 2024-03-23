import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  isDecimal,
} from 'class-validator';
import { ExceptionMessage } from '../data/exceptionsMessage';

export function IsDecimalCustom(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsDecimalCustom',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          return isDecimal(value);
        },
        defaultMessage(validationArguments: ValidationArguments) {
          return ExceptionMessage.IsDecimal(validationArguments.property);
        },
      },
    });
  };
}
