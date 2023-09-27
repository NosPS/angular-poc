import { User } from '../classes/user.class';

export async function UpdateUser(user: User) {
  try {
    let usersStr: string | null = window.localStorage.getItem('users');
    if (usersStr) {
      let users: Array<User> = await JSON.parse(usersStr);
      let usersMap = new Map(users.map((value) => [value.id, value]));
      usersMap.set(user.id, user);

      users = Array.from(usersMap.values());
      usersStr = JSON.stringify(users);

      window.localStorage.setItem('users', usersStr);
    }
  } catch (err: any) {
    console.log(err.message);
  }
}
