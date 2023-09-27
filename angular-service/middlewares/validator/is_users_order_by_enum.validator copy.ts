import { OrderByEnum } from '@dtos/enums/order_by.enum';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isOrderByEnum', async: false })
export class IsOrderByEnumConstraint implements ValidatorConstraintInterface {
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    return Object.values(OrderByEnum).includes(value as OrderByEnum);
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'order by must be id, name, age, gender, created_at, updated_at or deleted_at.';
  }
}
