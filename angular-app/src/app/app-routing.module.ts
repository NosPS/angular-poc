import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user-form/user-form.component';
import { TableComponent } from './components/table/table.component';

const routes: Routes = [
  { path: '', title: 'Home', component: HomeComponent },
  {
    path: 'user',
    title: 'User',
    component: UserComponent,
    children: [
      {
        path: '',
        title: 'User',
        component: TableComponent,
      },
      {
        path: 'add',
        title: 'Add User',
        component: UserFormComponent,
      },
      {
        path: 'edit/:id',
        title: 'Edit User',
        component: UserFormComponent,
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
