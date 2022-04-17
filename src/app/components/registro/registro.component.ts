import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/models/user';
import { UsersApiService } from 'src/app/services/users-api.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})

export class RegistroComponent implements OnInit {
  userForm!: FormGroup;
  onDestroy$ = new Subject<any>();
  userData!: User;
  errorMsg!: string;
  showAlert: boolean = false;

  constructor(private fb: FormBuilder, private usersApi: UsersApiService, private router: Router) { 
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      birthDate: ['', Validators.required],
      password: ['', Validators.required], 
      isChecked: [false, Validators.requiredTrue]
    })
  }

  ngOnInit(): void {
  }

  register() {
    let user: User = {
      username: this.userForm.value.username,
      name: this.userForm.value.name,
      lastName: this.userForm.value.lastName,
      email: this.userForm.value.email,
      birthDate: this.userForm.value.birthDate,
      password: this.userForm.value.password,
      role: 'user'
    };

    this.usersApi.register(user).pipe(takeUntil(this.onDestroy$))
    .subscribe({
      next: (data: any) => {
        if (data.dataUser) {
          this.usersApi.token = data.dataUser.accessToken;
          this.router.navigate(['/listado'])
        } else {
          this.errorMsg = data.error
          this.showAlert = true;
        }
      },
      error: (error) => console.log('Se ha producido un error', error)
    });
  }

}
