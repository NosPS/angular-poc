import { User } from '../classes/user.class';

export async function DeleteBatchUser(userIds: string[]) {
  try {
    let usersStr: string | null = window.localStorage.getItem('users');
    if (usersStr) {
      let users: Array<User> = await JSON.parse(usersStr);
      let usersSet: Set<User> = new Set(users);
      userIds.forEach((id) => {
        let user = users.find((user) => user.id === id);
        usersSet.delete(user!);
      });
      users = Array.from(usersSet);
      usersStr = JSON.stringify(users);
      window.localStorage.setItem('users', usersStr);
    }
  } catch (err: any) {
    console.log(err.message);
  }
}
