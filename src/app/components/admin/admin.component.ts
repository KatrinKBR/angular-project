import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UsersApiService } from 'src/app/services/users-api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  onDestroy$ = new Subject<any>();

  constructor(private usersApi: UsersApiService) { }

  ngOnInit(): void {
  }

  getDatos() {
    this.usersApi.datos().pipe(takeUntil(this.onDestroy$))
    .subscribe({
      next: (data: any) => {
        console.log(data)
      },
      error: (error) => console.log('Se ha producido un error', error)
    });
  }
}
