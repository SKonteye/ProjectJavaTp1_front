import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { User } from '../user.model';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {
  user: User = { id: 0, nom: '', email: '' };
  formData!: FormGroup;
  constructor(
    private userService: DataService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    // initialize the form data With user from form controls
    this.formData = this.fb.group({
      name: new FormControl('',  [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  saveUser() {
    // Confirm the user wants to save
    const isConfirmed = confirm('Are you sure you want to save this user?');
    this.formData.setValue({
      name: this.formData.value.name,
      email: this.formData.value.email
    })
    this.user.nom = this.formData.value.name;
    this.user.email = this.formData.value.email;
    this.userService.createUser(this.user).subscribe(() => {
      console.log('User created:', this.user);
      this.router.navigateByUrl('/UserList');
    });
  }
}
