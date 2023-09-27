import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { EnumMappingService } from '@store/enums/enum_mapping.service';
import { OrderEnum } from '@store/enums/order.enum';
import { UsersApi } from 'src/api/users.api';
import { ServiceProvider } from 'src/providers/service.provider';
import { User } from 'src/store/classes/user.class';
import { StoreService } from 'src/store/store.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  constructor(
    public storeService: StoreService,
    public serviceProvider: ServiceProvider,
    public router: Router,
    private enumMappingService: EnumMappingService,
    private usersApi: UsersApi
  ) {}

  updateAllComplete() {
    this.storeService.state.checked.allChecked =
      this.storeService.state.checked.checkedList != null &&
      this.storeService.state.checked.checkedList.every(
        (cl: any) => cl === true
      );
  }

  someComplete(): boolean {
    if (this.storeService.state.checked.checkedList == null) {
      return false;
    }
    return (
      this.storeService.state.checked.checkedList.filter(
        (cl: any) => cl === true
      ).length > 0 && !this.storeService.state.checked.allChecked
    );
  }

  setAll(checked: boolean) {
    this.storeService.state.checked.allChecked = checked;
    if (this.storeService.state.checked.checkedList == null) {
      return;
    }
    this.storeService.state.checked.checkedList.fill(checked);
  }

  handlerPageEvent(e: PageEvent) {
    this.storeService.state.pagination.page = e.pageIndex + 1;
    this.storeService.state.pagination.itemsPerPage = e.pageSize;
    this.usersApi.getUsers();
  }

  async deleteAll() {
    let userIds: string[] = [];
    this.storeService.state.checked.checkedList.forEach((cl, i) => {
      if (cl) {
        userIds.push(this.storeService.state.data.users[i].id);
      }
    });
    await this.usersApi.deleteBatchUser(userIds);
  }

  async deleteUser(userId: string) {
    await this.usersApi.deleteUser(userId);
  }

  editUser(user: User) {
    this.storeService.state.user = user;
    this.router.navigate(['/user/edit', user.id]);
  }

  async orderBy(by: string) {
    let orderBy = this.enumMappingService.parseOrderBy(by);
    if (orderBy) {
      if (this.storeService.state.pagination.orderBy !== by) {
        this.storeService.state.pagination.orderBy = orderBy;
        this.storeService.state.pagination.order = OrderEnum.ASC;
      } else {
        this.storeService.state.pagination.order =
          this.storeService.state.pagination.order === OrderEnum.ASC
            ? OrderEnum.DESC
            : OrderEnum.ASC;
      }
    }
    this.usersApi.getUsers();
  }
}
