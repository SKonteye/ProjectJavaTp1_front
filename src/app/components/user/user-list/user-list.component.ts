import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../user.model';
import { DataService } from '../data.service';
import { UserCreateComponent } from '../user-create/user-create.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {


  constructor(
    private userService: DataService,
    private modalComponent: UserCreateComponent,
    private router: Router) { }

  users: User[] = [];

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  deleteUser(id: number) {
    const isConfirmed = confirm('Are you sure you want to delete this user?');
    if (isConfirmed) {
      this.userService.deleteUser(id).subscribe(data => {
        console.log('User deleted:', data);
        this.ngOnInit(); // Refresh the component
      });
    }
  }
  editUser(user: User) {
    this.router.navigate(['/edit-user', user.id]);
  }
  
}
