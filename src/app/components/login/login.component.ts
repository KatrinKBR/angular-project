import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/models/user';
import { UsersApiService } from 'src/app/services/users-api.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  onDestroy$ = new Subject<any>();
  loggedData!: User;
  
  constructor(private fb: FormBuilder, private usersApi: UsersApiService) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    // Solo para efectos de prueba del metodo GET
    this.usersApi.getUsers<User>(environment.LOGGED_USERS_URL).pipe(takeUntil(this.onDestroy$))
    .subscribe({
      next: (data) => {
        this.loggedData = data;
        console.log(this.loggedData);
      },
      error: (error) => console.log('Se ha producido un error', error)
    });
  }

  login() {
    this.usersApi.postUser<User>(environment.LOGGED_USERS_URL, this.loginForm.value)
    .pipe(takeUntil(this.onDestroy$))
    .subscribe({
      next: (data) => {
        this.loggedData = data;
        console.log(this.loggedData);
        this.loginForm.reset();
      },
      error: (error) => console.log('Se ha producido un error', error)
    });
  }

}
