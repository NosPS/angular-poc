import { User } from 'src/store/classes/user.class';
import { StoreService } from 'src/store/store.service';

export interface IServiceProvider {
  getUsers(storeService: StoreService): void;
  getUserById(userId: string, storeService: StoreService): void;
  addUser(user: User): void;
  updateUser(user: User): void;
  deleteUser(userId: string): void;
  deleteBatchUser(userIds: string[]): void;
}
