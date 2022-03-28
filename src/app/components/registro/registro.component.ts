import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/models/user';
import { UsersApiService } from 'src/app/services/users-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})

export class RegistroComponent implements OnInit {
  userForm!: FormGroup;
  onDestroy$ = new Subject<any>();
  userData!: User;

  constructor(private fb: FormBuilder, private usersApi: UsersApiService) { 
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
      id: 0,
      username: this.userForm.value.username,
      name: this.userForm.value.name,
      lastName: this.userForm.value.lastName,
      email: this.userForm.value.email,
      birthDate: this.userForm.value.birthDate,
      password: this.userForm.value.password
    };

    this.usersApi.postUser<User>(environment.USERS_URL, user)
    .pipe(takeUntil(this.onDestroy$))
    .subscribe({
      next: (data) => {
        this.userData = data;
        console.log(`Usuario registrado correctamente`);
        this.userForm.reset();
      },
      error: (error) => console.log('Se ha producido un error', error)
    });
  }

}
