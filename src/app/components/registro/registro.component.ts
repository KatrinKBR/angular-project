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
      userName: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      birthDate: ['', Validators.required],
      password: ['', Validators.required], 
      isChecked: [false, Validators.requiredTrue]
    })
  }

  ngOnInit(): void {
    // Solo para efectos de prueba del metodo GET
    this.usersApi.getUsers<User>(environment.USERS_URL).pipe(takeUntil(this.onDestroy$))
    .subscribe({
      next: (data) => {
        this.userData = data;
        console.log(this.userData);
      },
      error: (error) => console.log('Se ha producido un error', error)
    });
  }

  register() {
    this.usersApi.postUser<User>(environment.USERS_URL, this.userForm.value)
    .pipe(takeUntil(this.onDestroy$))
    .subscribe({
      next: (data) => {
        this.userData = data;
        console.log(this.userData);
        this.userForm.reset();
      },
      error: (error) => console.log('Se ha producido un error', error)
    });
  }

}
