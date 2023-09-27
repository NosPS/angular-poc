import { OrderEnum } from '@dtos/enums/order.enum';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isOrderEnum', async: false })
export class IsOrderEnumConstraint implements ValidatorConstraintInterface {
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    return Object.values(OrderEnum).includes(value as OrderEnum);
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'order must be ASC or DESC.';
  }
}
