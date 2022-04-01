import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UsersApiService } from 'src/app/services/users-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
}
