import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.model';
import { DataService } from '../data.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {
  editForm!: FormGroup;
  userId!: number;

  constructor(
    private userService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

 
  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.initializeForm();
    this.loadUserData();
  }

  initializeForm(): void {
    this.editForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  loadUserData(): void {
    this.userService.getUserById(this.userId).subscribe(user => {
      this.editForm.patchValue({ name: user.nom, email: user.email });
    });
  }

  saveUser(): void {
    if (this.editForm.valid) {
      const updatedUser: User = { ...this.editForm.value, id: this.userId };
      this.userService.updateUser(updatedUser).subscribe(() => {
        this.router.navigate(['/users']);
      });
    }
  }
}
