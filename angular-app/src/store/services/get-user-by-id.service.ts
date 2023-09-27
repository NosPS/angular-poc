import { User } from '../classes/user.class';
import { StoreService } from '../store.service';

export async function GetUserById(userId: string, storeService: StoreService) {
  try {
    let usersStr: string | null = window.localStorage.getItem('users');
    if (usersStr) {
      let users = JSON.parse(usersStr);
      let user = users.find((user: User) => user.id === userId);
      if (user) {
        storeService.state.user = user;
      } else {
        console.error('User Not Found.');
      }
    } else {
      console.error('No Users Data.');
    }
  } catch (err: any) {
    console.log(err.message);
  }
}
