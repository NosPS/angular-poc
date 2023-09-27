import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceProvider } from 'src/providers/service.provider';
import { GenderEnum } from 'src/store/enums/gender.enum';
import { StoreService } from 'src/store/store.service';
import { nameValidator } from '../validators/name.validator';
import { UsersApi } from 'src/api/users.api';

@Component({
  selector: 'app-add-user',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  constructor(
    public storeService: StoreService,
    public serviceProvider: ServiceProvider,
    public router: Router,
    public route: ActivatedRoute,
    private usersApi: UsersApi
  ) {}

  public userForm!: FormGroup;

  public ages: Array<number> = [];
  public genders: Array<GenderEnum> = [];

  private maxAge: number = 100;

  ngOnInit(): void {
    this.route.paramMap.subscribe(async (params) => {
      let id = params.get('id');
      if (id) {
        await this.usersApi.getUserById(id);
        this.userForm.setValue({
          id: this.storeService.state.user.id,
          name: this.storeService.state.user.name,
          age: this.storeService.state.user.age,
          gender: this.storeService.state.user.gender,
        });
      }
    });

    this.userForm = new FormGroup({
      id: new FormControl(this.storeService.state.user.id),
      name: new FormControl(this.storeService.state.user.name, [
        Validators.required,
        nameValidator,
      ]),
      age: new FormControl(this.storeService.state.user.age, [
        Validators.required,
      ]),
      gender: new FormControl(this.storeService.state.user.gender, [
        Validators.required,
      ]),
    });

    for (let i = 0; i < this.maxAge; i++) {
      this.ages.push(i);
    }

    Object.values(GenderEnum).forEach((gender) => {
      this.genders.push(gender);
    });
  }

  get name() {
    return this.userForm.get('name')!;
  }
  get age() {
    return this.userForm.get('age')!;
  }
  get gender() {
    return this.userForm.get('gender')!;
  }

  saveHandler() {
    if (this.router.url === '/user/add') {
      this.addUser();
    } else {
      this.updateUser();
    }
  }

  async addUser() {
    await this.usersApi.createUser(this.userForm.value);
  }

  async updateUser() {
    await this.usersApi.updateUser(this.userForm.value);
  }

  async getUsers() {
    await this.usersApi.getUsers();
  }
}
