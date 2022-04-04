import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/models/user';
import { UsersApiService } from 'src/app/services/users-api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  onDestroy$ = new Subject<any>();
  allUsersData!: User[];

  constructor(private usersApi: UsersApiService, private router: Router) { }

  ngOnInit(): void {
    this.usersApi.datos().pipe(takeUntil(this.onDestroy$))
    .subscribe({
      next: (data: any) => {
        this.allUsersData = data
      },
      error: (error) => console.log('Se ha producido un error', error)
    });
  }

  logout() {
    this.usersApi.logout().pipe(takeUntil(this.onDestroy$))
    .subscribe({
      next: (data: any) => {
          this.router.navigate(['/'])
      },
      error: (error) => console.log('Se ha producido un error', error)
    });
  }
}
