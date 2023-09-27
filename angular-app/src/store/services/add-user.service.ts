import { User } from '../classes/user.class';
import { v4 as uuid } from 'uuid';

export async function AddUser(user: User) {
  try {
    let usersStr: string | null = window.localStorage.getItem('users');
    let users: Array<User>;
    user.id = uuid();
    if (usersStr) {
      users = JSON.parse(usersStr);
      users.push(user);
      usersStr = JSON.stringify(users);
    } else {
      users = [user];
      usersStr = JSON.stringify(users);
    }
    window.localStorage.setItem('users', usersStr);
  } catch (err: any) {
    console.log(err.message);
  }
}
