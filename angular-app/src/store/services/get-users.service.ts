import { User } from '../classes/user.class';
import { StoreService } from '../store.service';

export async function GetUsers(storeService: StoreService) {
  try {
    let usersStr: string | null = window.localStorage.getItem('users');
    let users: Array<User>;
    if (usersStr) {
      users = JSON.parse(usersStr);

      storeService.state.pagination.items = users.length;

      // if (storeService.state.pagination.orderBy !== '') {
      //   switch (storeService.state.pagination.orderBy) {
      //     case 'name':
      //       if (storeService.state.pagination.order === 'ASC') {
      //         users = users.sort((a, b) => a.name.localeCompare(b.name));
      //       } else if (storeService.state.pagination.order === 'DESC') {
      //         users = users.sort((a, b) => b.name.localeCompare(a.name));
      //       }
      //       break;
      //     case 'age':
      //       if (storeService.state.pagination.order === 'ASC') {
      //         users = users.sort((a, b) => a.age - b.age);
      //       } else if (storeService.state.pagination.order === 'DESC') {
      //         users = users.sort((a, b) => b.age - a.age);
      //       }
      //       break;
      //     case 'gender':
      //       if (storeService.state.pagination.order === 'ASC') {
      //         users = users.sort((a, b) => a.gender.localeCompare(b.gender));
      //       } else if (storeService.state.pagination.order === 'DESC') {
      //         users = users.sort((a, b) => b.gender.localeCompare(a.gender));
      //       }
      //       break;
      //   }
      // }

      if (storeService.state.pagination.search) {
        users = users.filter(
          (user) =>
            user.name
              .toLowerCase()
              .includes(storeService.state.pagination.search.toLowerCase()) ||
            user.age
              .toString()
              .includes(storeService.state.pagination.search) ||
            user.gender
              .toLowerCase()
              .includes(storeService.state.pagination.search.toLowerCase())
        );
      }

      users = users.slice(
        storeService.state.pagination.itemsPerPage *
          storeService.state.pagination.page -
          storeService.state.pagination.itemsPerPage,
        storeService.state.pagination.itemsPerPage *
          storeService.state.pagination.page
      );

      storeService.users = users;
    }
  } catch (err: any) {
    console.log(err.message);
  }
}
