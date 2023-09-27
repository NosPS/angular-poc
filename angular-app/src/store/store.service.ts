import { Injectable } from '@angular/core';
import { IStoreState } from './store.interface';
import { User } from './classes/user.class';
import { GenderEnum } from './enums/gender.enum';
import { OrderEnum } from './enums/order.enum';
import { OrderByEnum } from './enums/order_by.enum';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  public state: IStoreState = {
    data: {
      users: [],
    },
    user: new User(),
    pagination: {
      page: 1,
      items: 10,
      itemsPerPage: 10,
      order: OrderEnum.ASC,
      orderBy: OrderByEnum.created_at,
      search: '',
    },
    checked: {
      allChecked: false,
      checkedList: [],
    },
  };

  set users(users: User[]) {
    this.state.data.users = users;
    this.state.checked.allChecked = false;
    this.state.checked.checkedList = new Array(users.length).fill(false);
  }
}
