import { IsOrderEnumConstraint } from '@middlewares/validator/is_order_enum.validator';
import { ValidationOptions, registerDecorator } from 'class-validator';

export function IsOrderEnum(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isOrderEnum',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsOrderEnumConstraint,
    });
  };
}
