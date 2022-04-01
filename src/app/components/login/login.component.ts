import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/models/user';
import { UsersApiService } from 'src/app/services/users-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  onDestroy$ = new Subject<any>();
  loggedData!: User;
  
  constructor(private fb: FormBuilder, private usersApi: UsersApiService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  login() {
    this.usersApi.login(this.loginForm.value).pipe(takeUntil(this.onDestroy$))
    .subscribe({
      next: (data: any) => {

        if (data.dataUser) {
          console.log(`Inicio de sesion`)
          this.usersApi.token = data.dataUser.accessToken;
          sessionStorage.setItem("user", data.dataUser.username);

          if (data.dataUser.username === 'admin') {
            this.router.navigate(['/admin'])
          } else {
            this.router.navigate(['/dashboard'])
          }
        }
      },
      error: (error) => console.log('Se ha producido un error', error)
    });
  }

}
