import { User } from './classes/user.class';
import { OrderEnum } from './enums/order.enum';
import { OrderByEnum } from './enums/order_by.enum';

export interface IStoreState {
  data: {
    users: User[];
  };
  user: User;
  pagination: {
    page: number;
    items: number;
    itemsPerPage: number;
    order: OrderEnum;
    orderBy: OrderByEnum;
    search: string;
  };
  checked: {
    allChecked: boolean;
    checkedList: boolean[];
  };
}
