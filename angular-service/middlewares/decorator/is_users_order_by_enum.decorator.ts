import { IsOrderByEnumConstraint } from '@middlewares/validator/is_users_order_by_enum.validator copy';
import { ValidationOptions, registerDecorator } from 'class-validator';

export function IsOrderByEnum(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isOrderByEnum',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsOrderByEnumConstraint,
    });
  };
}
