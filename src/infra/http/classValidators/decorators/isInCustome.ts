import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  isIn,
} from 'class-validator';
import { ExceptionMessage } from '../data/exceptionsMessage';

export function IsInCustom(
  options: string[],
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsInCustom',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [options],
      options: validationOptions,
      validator: {
        validate(value: string) {
          return isIn(value, options);
        },
        defaultMessage(validationArguments: ValidationArguments) {
          return ExceptionMessage.IsIn(options, validationArguments.property);
        },
      },
    });
  };
}
