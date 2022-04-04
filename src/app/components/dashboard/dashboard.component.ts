import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UsersApiService } from 'src/app/services/users-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  onDestroy$ = new Subject<any>();

  constructor(private usersApi: UsersApiService, private router: Router) { }

  ngOnInit(): void {
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
