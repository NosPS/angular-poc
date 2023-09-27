import { OrderEnum } from '@store/enums/order.enum';
import { OrderByEnum } from '@store/enums/order_by.enum';

export class PageOptions {
  page!: number;
  pageSize!: number;
  order!: OrderEnum;
  orderBy!: OrderByEnum;
  search!: string;
}
