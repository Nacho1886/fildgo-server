import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isName', async: false })
export class IsNameConstraint implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    return /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(value);
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must contain only letters, spaces, hyphens, commas and dots`;
  }
}

export function IsName(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNameConstraint,
    });
  };
}
