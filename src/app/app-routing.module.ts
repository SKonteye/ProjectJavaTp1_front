import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // Import the Routes type

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserDetailsComponent } from './components/user/user-details/user-details.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent }, 
  { path: '', 
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'UserList', component: UserListComponent },
      { path: 'User/:id', component: UserDetailsComponent },
      { path: 'addUser', component: UserCreateComponent },
      { path: 'edit-user/:id', component: UserEditComponent },
    ]},
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
