import { Injectable } from '@angular/core';
import { User } from 'src/store/classes/user.class';
import { AddUser } from 'src/store/services/add-user.service';
import { DeleteBatchUser } from 'src/store/services/delete-batch-user.service';
import { DeleteUser } from 'src/store/services/delete-user.service';
import { GetUserById } from 'src/store/services/get-user-by-id.service';
import { GetUsers } from 'src/store/services/get-users.service';
import { UpdateUser } from 'src/store/services/update-user.service';
import { StoreService } from 'src/store/store.service';
import { IServiceProvider } from './service.interface';

@Injectable({
  providedIn: 'root',
})
export class ServiceProvider implements IServiceProvider {
  async getUsers(storeService: StoreService) {
    return await GetUsers(storeService);
  }

  async getUserById(userId: string, storeService: StoreService) {
    return await GetUserById(userId, storeService);
  }

  async addUser(user: User) {
    return await AddUser(user);
  }

  async updateUser(user: User) {
    return await UpdateUser(user);
  }

  async deleteUser(userId: string) {
    return await DeleteUser(userId);
  }

  async deleteBatchUser(userIds: string[]) {
    return await DeleteBatchUser(userIds);
  }
}
