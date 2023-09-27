import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UsersApi } from 'src/api/users.api';
import { ServiceProvider } from 'src/providers/service.provider';
import { User } from 'src/store/classes/user.class';
import { StoreService } from 'src/store/store.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(
    public storeService: StoreService,
    public serviceProvider: ServiceProvider,
    public router: Router,
    private usersApi: UsersApi
  ) {}

  checkEvents() {
    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationEnd:
          if (this.router.url === '/user')
            this.storeService.state.user = {} as User;
          break;

        default:
          break;
      }
    });
  }

  ngOnInit(): void {
    this.usersApi.getUsers();
    this.checkEvents();
  }

  onAddClick() {
    this.router.navigate(['/user/add']);
  }

  onBackClick() {
    this.router.navigate(['/user']);
  }

  async getUsers() {
    this.usersApi.getUsers();
  }
}
