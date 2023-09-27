import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PageMeta } from '@store/classes/page_meta.class';
import { PageOptions } from '@store/classes/page_options.class';
import { User } from '@store/classes/user.class';
import { StoreService } from '@store/store.service';
import * as rxjs from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersApi {
  private baseUrl = 'http://localhost:3000';
  constructor(
    private http: HttpClient,
    private storeService: StoreService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  async getUsers() {
    return rxjs
      .lastValueFrom(
        this.http.get(
          this.baseUrl +
            '/user/pagination' +
            '?' +
            `page=${
              this.storeService.state.pagination.page
                ? this.storeService.state.pagination.page
                : ''
            }` +
            '&' +
            `pageSize=${
              this.storeService.state.pagination.itemsPerPage
                ? this.storeService.state.pagination.itemsPerPage
                : ''
            }` +
            '&' +
            `order=${
              this.storeService.state.pagination.order
                ? this.storeService.state.pagination.order
                : ''
            }` +
            '&' +
            `orderBy=${
              this.storeService.state.pagination.orderBy
                ? this.storeService.state.pagination.orderBy
                : ''
            }` +
            '&' +
            `search=${
              this.storeService.state.pagination.search
                ? this.storeService.state.pagination.search
                : ''
            }`
        )
      )
      .then((response: any) => {
        let users: User[] = response.data;
        let pagination: PageMeta = response.meta;
        this.storeService.users = users;
        this.storeService.state.pagination.page = pagination.page;
        this.storeService.state.pagination.itemsPerPage = pagination.pageSize;
        this.storeService.state.pagination.items = pagination.count;
      });
  }

  async getUserById(id: string) {
    return rxjs
      .lastValueFrom(this.http.get(this.baseUrl + '/user/getbyid' + `/${id}`))
      .then((response: any) => {
        this.storeService.state.user = response;
      });
  }

  async createUser(user: User) {
    return rxjs
      .lastValueFrom(this.http.post(this.baseUrl + '/user/create', user))
      .then(async () => {
        await this.getUsers();
        this.router.navigate(['/user']);
        this.openSnackBar('Add User Succesfully.');
      });
  }

  async updateUser(user: User) {
    return rxjs
      .lastValueFrom(this.http.put(this.baseUrl + '/user/update', user))
      .then(async () => {
        await this.getUsers();
        this.router.navigate(['/user']);
        this.openSnackBar('Update User Succesfully.');
      });
  }

  async deleteUser(id: string) {
    return rxjs
      .lastValueFrom(this.http.delete(this.baseUrl + '/user/delete' + `/${id}`))
      .then(async () => {
        await this.getUsers();
        this.openSnackBar('Delete User Succesfully.');
      });
  }

  async deleteBatchUser(ids: string[]) {
    return rxjs
      .lastValueFrom(
        this.http.delete(this.baseUrl + '/user/deletebatch', { body: ids })
      )
      .then(async () => {
        await this.getUsers();
        this.openSnackBar('Delete Users Succesfully.');
      });
  }
}
