import { OrderEnum } from '@dtos/enums/order.enum';
import { OrderByEnum } from '@dtos/enums/order_by.enum';
import { IsOrderEnum } from '@middlewares/decorator/is_order_enum.decorator';
import { IsOrderByEnum } from '@middlewares/decorator/is_users_order_by_enum.decorator';
import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';

export class PageOptionsDto {
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  page: number;

  @IsInt()
  @Transform(({ value }) => parseInt(value))
  pageSize: number;

  @IsOrderEnum()
  order: OrderEnum;

  @IsOrderByEnum()
  orderBy: OrderByEnum;

  search!: string;
}
